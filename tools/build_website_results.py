#!/usr/bin/env python3
"""Rebuild the website's result matrix and plots from docs/assets/results.json.

Requires matplotlib. Data transcribes the main results table in the paper's
sections/results.tex (Constraint, Memos, Program, Pairs, Macro average).
Model colors match figures/plot_performance_cost_all_suites.py. Both the
interactive charts and static figures read this same local data file.
"""
from pathlib import Path
import html
import json
import os
import re
import tempfile

os.environ.setdefault('XDG_CACHE_HOME', str(Path(tempfile.gettempdir()) / 'longharness-cache'))
os.environ.setdefault('MPLCONFIGDIR', str(Path(tempfile.gettempdir()) / 'longharness-matplotlib'))
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
from matplotlib.ticker import FixedLocator, FuncFormatter

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'docs/assets'
DATA = json.loads((ASSETS / 'results.json').read_text())
HARNESSES = ['Direct', 'RLM', 'OpenCode', 'mini-swe-agent', 'ReAct']
LABELS = ['Direct', 'RLM', 'Open<wbr>Code', 'mini-swe', 'ReAct']
COLORS = [row['color'] for row in DATA]
MARKERS = ['o', 's', '^', 'D', 'P']
DATASETS = {
    'program-execution-tracing': 'Program Execution Tracing',
    'outlier-memo-detection': 'Outlier Memo Detection',
    'constraint-solving-search': 'Constraint Solving Search',
    'equivalent-program-pair-search': 'Equivalent Program Pair Search',
}


def validate_data():
    assert len(DATA) == 5 and len({row['model'] for row in DATA}) == 5
    for row in DATA:
        assert re.fullmatch(r'#[0-9a-fA-F]{6}', row['color'])
        assert [r['harness'] for r in row['results']] == HARNESSES
        for result in row['results']:
            assert set(result['datasets']) == set(DATASETS)
            for metric in [result, *result['datasets'].values()]:
                assert 0 <= metric['accuracy'] <= 100 and .1 <= metric['cost'] <= 20
            for metric, tolerance in [('accuracy', .001), ('cost', .005)]:
                mean = sum(r[metric] for r in result['datasets'].values()) / len(DATASETS)
                assert abs(mean - result[metric]) <= tolerance, (row['model'], result['harness'], metric)


def cell_colors(value, maximum, low, high):
    ratio = min(1, max(0, value / maximum))
    rgb = [round(a + (b-a)*ratio) for a, b in zip(low, high)]
    def luminance(color):
        linear = [(c/255/12.92 if c/255 <= .04045 else ((c/255+.055)/1.055)**2.4) for c in color]
        return sum(c*w for c,w in zip(linear,[.2126,.7152,.0722]))
    ink = luminance([32,52,79])
    lum = luminance(rgb)
    # Reserve readable luminance bands for white and navy. The mapping stays
    # monotonic, so higher accuracy / lower cost still means a darker cell.
    crossover = (1.05 * (ink + .05)) ** .5 - .05
    contrast_target = 4.6  # Leave room for rounding RGB channels.
    white_limit = 1.05 / contrast_target - .05
    navy_limit = contrast_target * (ink + .05) - .05
    use_white = lum <= crossover
    target = lum * white_limit / crossover if use_white else (
        navy_limit + (lum-crossover) * (1-navy_limit) / (1-crossover)
    )
    linear = [c/255/12.92 if c/255 <= .04045 else ((c/255+.055)/1.055)**2.4 for c in rgb]
    if use_white:
        linear = [c * target / lum if lum else 0 for c in linear]
    else:
        linear = [c + (1-c) * (target-lum) / (1-lum) if lum < 1 else 1 for c in linear]
    rgb = [round(255 * (12.92*c if c <= .0031308 else 1.055*c**(1/2.4)-.055)) for c in linear]
    foreground = '#ffffff' if use_white else '#20344f'
    return '#' + ''.join(f'{c:02x}' for c in rgb), foreground


def build_matrix():
    lines = ['          <div class="matrix-scroll" role="region" aria-label="All model and harness results" tabindex="0">',
             '            <table class="results-matrix" id="results-matrix" data-metric="both" aria-describedby="matrix-caption">',
             '              <caption class="sr-only" id="matrix-table-caption">Macro-average exact accuracy (%) and estimated cost per instance (USD) by model and harness</caption>',
             '              <thead><tr><th scope="col">Model</th>' + ''.join(f'<th scope="col">{label}</th>' for label in LABELS) + '</tr></thead>',
             '              <tbody>']
    for row in DATA:
        assert [r['harness'] for r in row['results']] == HARNESSES
        cells = []
        for result in row['results']:
            acc, cost = result['accuracy'], result['cost']
            ac, af = cell_colors(acc,70,[239,244,250],[50,84,124])
            # Darker indicates better performance for both metrics.
            cc, cf = cell_colors(cost,8,[67,111,121],[241,247,247])
            title = html.escape(f"{row['model']} · {result['harness']}: {acc:.1f}% accuracy; ${cost:g} per instance", quote=True)
            cells.append(f'<td data-accuracy="{acc:.1f}" data-cost="{cost:g}" title="{title}" style="--accuracy-color:{ac};--accuracy-ink:{af};--cost-color:{cc};--cost-ink:{cf}"><span class="matrix-values"><span class="matrix-accuracy">{acc:.1f}%</span><span class="matrix-cost">${cost:.2f}</span></span></td>')
        lines.append('                <tr><th scope="row">' + html.escape(row['model']) + '</th>' + ''.join(cells) + '</tr>')
    lines.extend(['              </tbody>', '            </table>', '          </div>'])
    page = ROOT / 'docs/index.html'
    source = page.read_text()
    source,count = re.subn(r'(?<=<!-- RESULTS_MATRIX_START -->).*?(?=          <!-- RESULTS_MATRIX_END -->)', '\n'+'\n'.join(lines)+'\n',source,flags=re.S)
    assert count == 1, 'Missing result matrix markers'
    accuracy_scale = ', '.join(cell_colors(i*70/8,70,[239,244,250],[50,84,124])[0] for i in range(9))
    cost_scale = ', '.join(cell_colors(8-i,8,[67,111,121],[241,247,247])[0] for i in range(9))
    legend = f'<div class="matrix-legends" aria-label="Color scales" style="--accuracy-scale:linear-gradient(to right, {accuracy_scale});--cost-scale:linear-gradient(to right, {cost_scale})">'
    source = re.sub(r'<div class="matrix-legends"[^>]*>', legend, source)
    page.write_text(source)


def build_plot():
    plt.rcParams.update({'font.family':'DejaVu Sans', 'font.size':11, 'text.color':'#314b6c',
                         'axes.labelcolor':'#53677f', 'xtick.color':'#53677f', 'ytick.color':'#53677f',
                         'svg.fonttype':'path', 'svg.hashsalt':'longharness-results'})
    fig, ax = plt.subplots(figsize=(12,6))
    fig.subplots_adjust(left=.08,right=.72,bottom=.16,top=.91)
    ax.set_xscale('log')
    ax.set_xlim(.12,10)
    ax.set_ylim(-4,75)
    ax.set_xlabel('Estimated cost per instance (USD · log scale)', labelpad=13)
    ax.set_ylabel('Macro-average exact accuracy (%)',labelpad=12)
    ax.xaxis.set_major_locator(FixedLocator([.2,.5,1,2,5,10]))
    ax.xaxis.set_major_formatter(FuncFormatter(lambda v,_: f'${v:g}'))
    ax.xaxis.set_minor_locator(FixedLocator([]))
    ax.set_yticks([0,20,40,60])
    ax.grid(color='#e3e9f0',linewidth=.8,zorder=0)
    for spine in ['top','right']: ax.spines[spine].set_visible(False)
    for spine in ['bottom','left']: ax.spines[spine].set_color('#bbc8d7')
    ax.tick_params(length=0,pad=9)
    for row,color in zip(DATA,COLORS):
        for result,marker in zip(row['results'],MARKERS):
            ax.scatter(result['cost'],result['accuracy'],marker=marker,s=95,color=color,edgecolor='white',linewidth=.8,zorder=3)
    model_handles=[Line2D([],[],marker='o',linestyle='',markersize=8,color=color,label=row['model']) for row,color in zip(DATA,COLORS)]
    harness_handles=[Line2D([],[],marker=m,linestyle='',markersize=8,color='#53677f',label=h if h!='Direct' else 'Direct reading') for h,m in zip(HARNESSES,MARKERS)]
    fig.legend(handles=model_handles,title='MODEL',loc='upper left',bbox_to_anchor=(.76,.92),frameon=False,labelspacing=.9,title_fontsize=10,fontsize=10)
    fig.legend(handles=harness_handles,title='HARNESS',loc='upper left',bbox_to_anchor=(.76,.49),frameon=False,labelspacing=.9,title_fontsize=10,fontsize=10)
    ax.set_title('All 25 combinations · 5 models × 5 evaluation setups',loc='left',fontsize=12,pad=16,fontweight='medium')
    fig.savefig(ASSETS/'results-overview.svg',facecolor='white',metadata={'Date':None,'Description':'All 25 LongHarness model–harness combinations. Macro-average exact accuracy against estimated mean cost per instance.'})
    plt.close(fig)


def build_dataset_plot():
    fig = plt.figure(figsize=(12, 8.2))
    grid = fig.add_gridspec(2, 2, left=.075, right=.97, top=.78, bottom=.085,
                          hspace=.55, wspace=.20)
    axes = [fig.add_subplot(grid[r, c]) for r in (0, 1) for c in (0, 1)]
    for ax, (suite, title) in zip(axes, DATASETS.items()):
        ax.set_xscale('log')
        ax.set_xlim(.1, 20)
        ax.set_ylim(-5, 105)
        ax.set_yticks([0, 25, 50, 75, 100])
        ax.xaxis.set_major_locator(FixedLocator([.1, .2, .5, 1, 2, 5, 10, 20]))
        ax.xaxis.set_major_formatter(FuncFormatter(lambda v, _: f'${v:g}'))
        ax.xaxis.set_minor_locator(FixedLocator([]))
        ax.set_xlabel('Cost per instance (USD · log scale)', fontsize=10, labelpad=8)
        ax.set_ylabel('Accuracy (%)', fontsize=10)
        ax.set_title(title, loc='left', fontsize=12, pad=14, fontweight='medium')
        ax.grid(color='#e3e9f0', linewidth=.8, zorder=0)
        for spine in ['top', 'right']: ax.spines[spine].set_visible(False)
        for spine in ['bottom', 'left']: ax.spines[spine].set_color('#bbc8d7')
        ax.tick_params(length=0, pad=7, labelsize=9)
        for row in DATA:
            for result, marker in zip(row['results'], MARKERS):
                values = result['datasets'][suite]
                ax.scatter(values['cost'], values['accuracy'], marker=marker, s=70,
                           color=row['color'], edgecolor='white', linewidth=.8, zorder=3)
    models = [Line2D([], [], marker='o', linestyle='', markersize=8, color=row['color'], label=row['model']) for row in DATA]
    harnesses = [Line2D([], [], marker=m, linestyle='', markersize=8, color='#53677f', label=h if h != 'Direct' else 'Direct reading') for h, m in zip(HARNESSES, MARKERS)]
    fig.legend(handles=models, loc='upper center', bbox_to_anchor=(.52, .985), ncol=5, frameon=False, fontsize=11)
    fig.legend(handles=harnesses, loc='upper center', bbox_to_anchor=(.52, .93), ncol=5, frameon=False, fontsize=11)
    fig.text(.075, .86, 'All 25 configurations · 50 instances per dataset · Shared accuracy and cost scales', fontsize=11, color='#53677f')
    fig.savefig(ASSETS / 'results-datasets.svg', facecolor='white', metadata={
        'Date': None, 'Description': 'Four LongHarness dataset plots. All 25 model–harness configurations per plot, with shared accuracy and logarithmic cost scales.'})
    plt.close(fig)


if __name__ == '__main__':
    validate_data()
    build_matrix()
    build_plot()
    build_dataset_plot()
    for filename in ('results-overview.svg', 'results-datasets.svg'):
        path = ASSETS / filename
        path.write_text('\n'.join(line.rstrip() for line in path.read_text().splitlines()) + '\n')
    print('Built result matrix, macro plot, and four dataset plots for all 25 combinations.')
