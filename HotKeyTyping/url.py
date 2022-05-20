import keyboard
import json


def get_url(x):
    return "https://alison.com/courseware/1786/14436/3/" + str(x) + ".html"


count = 1


def print_hello():
    global count
    wr = get_url(count)
    print(wr)
    keyboard.write(wr)
    count += 1


keyboard.add_hotkey("ctrl+v", lambda: print_hello())
keyboard.wait("Esc")