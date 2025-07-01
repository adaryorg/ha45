#!/usr/bin/env python3

import datetime as dt
import glob
from calendar import monthrange
from datetime import date, timedelta

import frontmatter
import matplotlib.dates as mdates
import matplotlib.pyplot as plt
import numpy as np

month = "June"


class DailyLog:
    def __init__(self):
        self.weight = []
        self.steps = []
        self.distance = []


class NutritionLog:
    def __init__(self):
        self.calories = []
        self.carbs = []
        self.fat = []
        self.protein = []
        self.b_calories = []
        self.b_carbs = []
        self.b_fat = []
        self.b_protein = []
        self.l_calories = []
        self.l_carbs = []
        self.l_fat = []
        self.l_protein = []
        self.d_calories = []
        self.d_carbs = []
        self.d_fat = []
        self.d_protein = []
        self.s_calories = []
        self.s_carbs = []
        self.s_fat = []
        self.s_protein = []


def getDates(m_month):
    m_num = dt.datetime.strptime(m_month, "%B").month
    c_year = dt.datetime.now().year
    m_days = monthrange(c_year, m_num)
    start_dt = date(c_year, m_num, 1)
    end_dt = date(c_year, m_num, m_days[1])
    delta = timedelta(days=1)
    i_dates = []
    while start_dt <= end_dt:
        i_dates.append(start_dt.isoformat())
        start_dt += delta
    return i_dates


def sortValues(v_values):
    t_values = list(map(lambda x: 0 if x is None else x, v_values))
    t_values = list(map(float, t_values))
    return t_values


def plotSingleGraph(p_dates, p_name, p_values, p_title, p_month):
    vv = np.array(p_values)
    x = [dt.datetime.strptime(d, "%Y-%m-%d").date() for d in p_dates]
    plt.style.use("dark_background")
    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter("%Y-%m-%d"))
    plt.gca().xaxis.set_major_locator(mdates.DayLocator())
    plt.figure(figsize=(14, 8))
    plt.xlabel("Date", fontweight="bold")
    plt.ylabel(p_name, fontweight="bold")
    plt.title(p_title)
    plt.plot(x, vv, linestyle="-")
    for i, (xi, yi) in enumerate(zip(x, vv)):
        plt.annotate(
            f"{yi}",
            (xi, yi),
            textcoords="offset points",
            xytext=(0, 10),
            ha="center",
        )
    plt.gcf().autofmt_xdate()
    plt.savefig("../content/data/" + p_month + "/" + p_name + ".png")


def plotMultiGraph(p_dates, p_name, p_values, p_title, p_month):
    vv1 = np.array(p_values[0])
    vv2 = np.array(p_values[1])
    vv3 = np.array(p_values[2])
    vv4 = np.array(p_values[3])

    vp1 = vv1
    vp2 = vp1 + vv2
    vp3 = vp2 + vv3
    vp4 = vp3 + vv4

    x = [dt.datetime.strptime(d, "%Y-%m-%d").date() for d in p_dates]
    plt.style.use("dark_background")
    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter("%Y-%m-%d"))
    plt.gca().xaxis.set_major_locator(mdates.DayLocator())
    plt.figure(figsize=(14, 8))
    plt.xlabel("Date", fontweight="bold")
    plt.ylabel(p_name, fontweight="bold")
    plt.title(p_title)
    plt.plot(x, vp1, linestyle="-")
    plt.plot(x, vp2, linestyle="-")
    plt.plot(x, vp3, linestyle="-")
    plt.plot(x, vp4, linestyle="-")
    for i, (xi, yi) in enumerate(zip(x, vp4)):
        plt.annotate(
            f"{yi}",
            (xi, yi),
            textcoords="offset points",
            xytext=(0, 10),
            ha="center",
        )
    plt.fill_between(x, vp1, vp2, color="green", alpha=0.2)
    plt.fill_between(x, vp2, vp3, color="blue", alpha=0.2)
    plt.fill_between(x, vp3, vp4, color="purple", alpha=0.2)
    plt.gcf().autofmt_xdate()
    plt.savefig("../content/data/" + p_month + "/" + p_name + ".png")


def writeNutritionTable(data, d_type, filename, dates):
    n = sortValues(data[0])
    nb = sortValues(data[1])
    nl = sortValues(data[2])
    nd = sortValues(data[3])
    ns = sortValues(data[4])
    with open(filename, "a") as f:
        f.write("## {0} data\n".format(d_type))
        f.write("\n")
        f.write("> [!example]- {0} graphs\n".format(d_type))
        f.write("> ![[{0}.png]]\n".format(d_type.lower()))
        f.write("> ![[s_{0}.png]]\n".format(d_type.lower()))
        f.write("\n")
        f.write("> [!example]- {0} data\n".format(d_type))
        f.write(
            "> | Date | Total {0} | Breakfast {0} | Lunch {0} | Dinner {0} | Snacks {0} | Sum |\n".format(
                d_type
            )
        )
        f.write("> |:----|:----:|:----:|:----:|:----:|:----:|:----:|\n")
        for i in range(len(n)):
            line = "> |{0}|{1}|{2}|{3}|{4}|{5}|{6}|\n".format(
                dates[i],
                n[i],
                nb[i],
                nl[i],
                nd[i],
                ns[i],
                round(nb[i] + nl[i] + nd[i] + ns[i], 2),
            )
            f.write(line)
        f.write("\n")
        f.write("> [!example]- {0} data highlights\n".format(d_type))
        f.write("> \n")
        # overall
        k = n.index(max(n))
        f.write("> Max overall {0}: {1} on {2}\n".format(d_type, n[k], dates[k]))
        k = n.index(min([i for i in n if i != 0]))
        f.write("> Min overall {0}: {1} on {2}\n".format(d_type, n[k], dates[k]))
        k = [v for v in n if v != 0]
        avg = sum(k) / len(k)
        f.write("> Avg overall {0}: {1} \n".format(d_type, round(avg, 1)))
        f.write("> \n")

        # breakfast
        k = nb.index(max(nb))
        f.write("> Max breakfast {0}: {1} on {2}\n".format(d_type, nb[k], dates[k]))
        k = nb.index(min([i for i in nb if i != 0]))
        f.write("> Min breakfast {0}: {1} on {2}\n".format(d_type, nb[k], dates[k]))
        k = [v for v in nb if v != 0]
        avg = sum(k) / len(k)
        f.write("> Avg breakfast {0}: {1} \n".format(d_type, round(avg, 1)))
        f.write("> \n")

        # lunch
        k = nl.index(max(nl))
        f.write("> Max lunch {0}: {1} on {2}\n".format(d_type, nl[k], dates[k]))
        k = nl.index(min([i for i in nl if i != 0]))
        f.write("> Min lunch {0}: {1} on {2}\n".format(d_type, nl[k], dates[k]))
        k = [v for v in nl if v != 0]
        avg = sum(k) / len(k)
        f.write("> Avg lunch {0}: {1} \n".format(d_type, round(avg, 1)))
        f.write("> \n")

        # dinner
        k = nd.index(max(nd))
        f.write("> Max dinner {0}: {1} on {2}\n".format(d_type, nd[k], dates[k]))
        k = nd.index(min([i for i in nd if i != 0]))
        f.write("> Min dinner {0}: {1} on {2}\n".format(d_type, nd[k], dates[k]))
        k = [v for v in nd if v != 0]
        avg = sum(k) / len(k)
        f.write("> Avg dinner {0}: {1} \n".format(d_type, round(avg, 1)))
        f.write("> \n")

        # snack
        k = ns.index(max(ns))
        f.write("> Max snacks {0}: {1} on {2}\n".format(d_type, ns[k], dates[k]))
        k = ns.index(min([i for i in ns if i != 0]))
        f.write("> Min snacks {0}: {1} on {2}\n".format(d_type, ns[k], dates[k]))
        k = [v for v in ns if v != 0]
        avg = sum(k) / len(k)
        f.write("> Avg snacks {0}: {1} \n".format(d_type, round(avg, 1)))
        f.write("> \n")


def writeExerciseTable(data, d_type, filename, dates):
    n = sortValues(data)
    with open(filename, "a") as f:
        f.write("## {0} data\n".format(d_type))
        f.write("\n")
        f.write("> [!example]- {0} graphs\n".format(d_type))
        f.write("> ![[{0}.png]]\n".format(d_type.lower()))
        f.write("\n")
        f.write("> [!example]- {0} data\n".format(d_type))
        f.write("> | Date | Total {0} |\n".format(d_type))
        f.write("> |:----|:----:|\n")
        for i in range(len(n)):
            line = "> |{0}|{1}|\n".format(dates[i], n[i])
            f.write(line)

        f.write("\n")
        f.write("> [!example]- {0} data highlights\n".format(d_type))
        f.write("> \n")
        # snack
        k = n.index(max(n))
        f.write("> Max {0}: {1} on {2}\n".format(d_type, n[k], dates[k]))
        k = n.index(min([i for i in n if i != 0]))
        f.write("> Min {0}: {1} on {2}\n".format(d_type, n[k], dates[k]))
        k = [v for v in n if v != 0]
        avg = sum(k) / len(k)
        f.write("> Avg {0}: {1} \n".format(d_type, round(avg, 1)))
        f.write("> \n")


def writeHeader(header, filename):
    with open(filename, "a") as f:
        f.write("# {0} data\n".format(header))


daily = DailyLog()
nutrition = NutritionLog()

dates = getDates(month)

filelist_d = glob.glob("../content/daily_logs/" + month + "/*.md")
filelist_n = glob.glob("../content/nutrition_log/" + month + "/*.md")
filelist_d.sort()
filelist_n.sort()
for file in filelist_d:
    with open(file) as stream:
        data = frontmatter.load(stream)
        daily.weight.append(data["weight"])
        daily.steps.append(data["steps"])
        daily.distance.append(data["distance"])

for file in filelist_n:
    with open(file) as stream:
        data = frontmatter.load(stream)
        nutrition.calories.append(data["calories"])
        nutrition.protein.append(data["protein"])
        nutrition.carbs.append(data["carbs"])
        nutrition.fat.append(data["fat"])
        nutrition.b_calories.append(data["breakfast_calories"])
        nutrition.b_protein.append(data["breakfast_protein"])
        nutrition.b_carbs.append(data["breakfast_carbs"])
        nutrition.b_fat.append(data["breakfast_fat"])
        nutrition.l_calories.append(data["lunch_calories"])
        nutrition.l_protein.append(data["lunch_protein"])
        nutrition.l_carbs.append(data["lunch_carbs"])
        nutrition.l_fat.append(data["lunch_fat"])
        nutrition.d_calories.append(data["dinner_calories"])
        nutrition.d_protein.append(data["dinner_protein"])
        nutrition.d_carbs.append(data["dinner_carbs"])
        nutrition.d_fat.append(data["dinner_fat"])
        nutrition.s_calories.append(data["snacks_calories"])
        nutrition.s_protein.append(data["snacks_protein"])
        nutrition.s_carbs.append(data["snacks_carbs"])
        nutrition.s_fat.append(data["snacks_fat"])


filename = "../content/data/" + month + "/data.md"
with open(filename, "w") as f:
    f.write("---\n")
    f.write("date: 2025-04-30\n")
    f.write("draft: false\n")
    f.write("title: Data summary for May 2025\n")
    f.write("tags:\n")
    f.write("  - data\n")
    f.write("---\n")
    f.write("# [[data/May/data]]\n")

writeHeader("Nutrition", filename)

title = "Fat for May 2025"
values1 = sortValues(nutrition.fat)
values2 = sortValues(nutrition.b_fat)
values3 = sortValues(nutrition.l_fat)
values4 = sortValues(nutrition.d_fat)
values5 = sortValues(nutrition.s_fat)
values = (values2, values3, values4, values5)
values_all = (values1, values2, values3, values4, values5)
graph_name = "fat"
plotMultiGraph(dates, graph_name, values, title, month)
graph_name = "s_fat"
plotSingleGraph(dates, graph_name, values1, title, month)
writeNutritionTable(values_all, "Fat", filename, dates)

title = "Carbs for May 2025"
values1 = sortValues(nutrition.carbs)
values2 = sortValues(nutrition.b_carbs)
values3 = sortValues(nutrition.l_carbs)
values4 = sortValues(nutrition.d_carbs)
values5 = sortValues(nutrition.s_carbs)
values = (values2, values3, values4, values5)
values_all = (values1, values2, values3, values4, values5)
graph_name = "carbs"
plotMultiGraph(dates, graph_name, values, title, month)
graph_name = "s_carbs"
plotSingleGraph(dates, graph_name, values1, title, month)
writeNutritionTable(values_all, "Carbs", filename, dates)

title = "Protein for May 2025"
values1 = sortValues(nutrition.protein)
values2 = sortValues(nutrition.b_protein)
values3 = sortValues(nutrition.l_protein)
values4 = sortValues(nutrition.d_protein)
values5 = sortValues(nutrition.s_protein)
values = (values2, values3, values4, values5)
values_all = (values1, values2, values3, values4, values5)
graph_name = "protein"
plotMultiGraph(dates, graph_name, values, title, month)
graph_name = "s_protein"
plotSingleGraph(dates, graph_name, values1, title, month)
writeNutritionTable(values_all, "Protein", filename, dates)

title = "Calories for May 2025"
values1 = sortValues(nutrition.calories)
values2 = sortValues(nutrition.b_calories)
values3 = sortValues(nutrition.l_calories)
values4 = sortValues(nutrition.d_calories)
values5 = sortValues(nutrition.s_calories)
values = (values2, values3, values4, values5)
values_all = (values1, values2, values3, values4, values5)
graph_name = "calories"
plotMultiGraph(dates, graph_name, values, title, month)
graph_name = "s_calories"
plotSingleGraph(dates, graph_name, values1, title, month)
writeNutritionTable(values_all, "Calories", filename, dates)

writeHeader("Exercise", filename)

title = "Steps for May 2025"
graph_name = "steps"
values = sortValues(daily.steps)
plotSingleGraph(dates, graph_name, values, title, month)
writeExerciseTable(values, graph_name, filename, dates)

title = "Distance for May 2025"
graph_name = "distance"
values = sortValues(daily.distance)
plotSingleGraph(dates, graph_name, values, title, month)
writeExerciseTable(values, graph_name, filename, dates)

title = "Weight for May 2025"
graph_name = "weight"
values = sortValues(daily.weight)
plotSingleGraph(dates, graph_name, values, title, month)
writeExerciseTable(values, graph_name, filename, dates)
