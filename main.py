from os import path

from aiogram import Bot, Dispatcher
from aiogram.filters import Command
from aiogram.types import Message, BotCommandScope

from prettytable import PrettyTable

from config import config
from utils import load_json_data

main_dir = path.dirname(__file__)
filename = path.join(main_dir, "storage", "schedule.json")

schedule = load_json_data(filename)
days = tuple(map(lambda day: day.lower(), schedule.keys()))

bot = Bot(token=config["token"])

# bot.set_my_commands(commands=[
#     BotCommandScope(command="start", description="Запуск бота"),
#     BotCommandScope(command="help", description="Запуск бота"),
#     BotCommandScope(command="load", description="Запуск бота"),
# ])

dp = Dispatcher()

day_names_ru = {
    "Monday": "Понедельник",
    "Tuesday": "Вторник",
    "Wednesday": "Среда",
    "Thursday": "Четверг",
    "Friday": "Пятница",
    "Saturday": "Суббота",
    "Sunday": "Воскресенье"
}


@dp.message(Command(commands=["start"]))
async def start(message: Message):
    pass


@dp.message(Command(commands=[*days]))
async def sendLessons(message: Message):
    
    for day in days:
        if message.text == f"/{day}":
            key = day.capitalize()

            if "lessons" in schedule[key]:
                lessons = schedule[key]["lessons"]

                table = PrettyTable()
                table.border = False
                table.field_names = ["Номер", "Начало", "Конец", "Урок", "Замена"]
                for lesson in lessons:
                    table.add_row(tuple(lesson.values()))
                
                text = f"Расписание на {day_names_ru[key]}\n\n<code>{table.get_string()}</code>"
                await message.answer(text, parse_mode="HTML")

            else:
                await message.answer("🎉🎉 Выходной 🎉🎉")

@dp.message(Command(commands=['schedule']))
async def sendAllLessons(message: Message):
    table = PrettyTable()
    table.border = True
    table.field_names = ["№", "Начало", "Конец", "Урок", "Замена"]

    for day in days:
        key = day.capitalize()
        if "lessons" in schedule[key]:
            
            # header = "| № | Начало | Конец | Урок | Замена |\n|---|---|---|---|---|"
            # table_list.append(header)
            lessons = schedule[key]["lessons"]

            for item in enumerate(lessons):
                index = item[0]
                lesson = item[1]
                replacement = "Да" if lesson["replacement"] else "Нет"

                row = [lesson["number"], lesson["start_time"], lesson["end_time"], lesson["title"], replacement]
        
                if index < len(lessons) - 1:
                    table.add_row(row)
                else:
                    table.add_row(row, divider=True)
                 
        else:
            day_off = schedule[key]["day_off"][0]["title"]
            row = ["", "", "", day_off, ""]
            table.add_row(row, divider=True)

    await message.answer(
        f"*Расписание на неделю*\n<code>{table.get_string()}</code>",
        parse_mode="HTML"
    )

if __name__ == "__main__":
    dp.run_polling(bot)

"""

Расписание на Понедельник

1 Алгебра         (08:00 - 08:40)
2 Информатика     (08:50 - 09:30)
3 Химия           (09:50 - 10:30)
4 Английский язык (10:50 - 11:30)
5 Музыка          (11:40 - 12:20)
6 Технология      (12:40 - 13:20)
7 Технология      (13:30 - 14:10)
"""