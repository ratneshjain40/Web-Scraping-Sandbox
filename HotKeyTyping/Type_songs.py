import keyboard
import json

f = open('../Saavn/jio_playlist.json', "r")
data = json.loads(f.read())
c = open('config.json', "r")
temp = json.loads(c.read())
count = temp["count"]


def print_hello():
    global count
    if(count < int(data["list_count"])):
        wr = data["list"][count]["title"]
        print(wr)
        keyboard.write(wr)
        count += 1
    else:
        print("Playlist over")


keyboard.add_hotkey("ctrl+v", lambda: print_hello())
keyboard.wait("Esc")
config = {
    "count": count,
}
with open("config.json", "w") as outfile:
    json.dump(config, outfile)
f.close()
c.close()
