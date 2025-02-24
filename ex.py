from prettytable import PrettyTable

table = PrettyTable()

table.field_names = ["Number", "Title", "Time"]

table.add_rows(
    [
        [1, 'Math', '8:00'],
        [2, 'Russia', '9:00'],
        [3, 'English', '10:00'],
    ]
)

table.border = False

print(table)