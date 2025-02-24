# from os import path
import json

# main_dir = path.dirname(__file__)
# filename = path.join(main_dir, "storage", "schedule.json")


def load_json_data(filename: str) -> dict:
    with open(filename, encoding="utf-8") as file:
        return json.load(file)


def write_json_data(filename: str, data: dict) -> None:
    with open(filename, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)


# data = load_json_data(filename)
# write_json_data(path.join(main_dir, "storage", "copy.json"), data)
