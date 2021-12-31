let modes = {
    party: {
        on: false,
        start: () => setTimeout(modes.party.blink, 0),
        blink: () => {
            if (modes.party.on) {
                updateBackgroundColor("black");
                setTimeout(() => updateBackgroundColor(currentColor), 200);
                setTimeout(modes.party.blink, 400);
            }
        },
    },
    rainbow: {
        on: false,
        start: () => setTimeout(modes.rainbow.rainbow, 0, 0xff, 0x00, 0x00, 2),
        rainbow: (r, g, b, dir) => {
            if (modes.rainbow.on) {
                updateCurrentColor(toColorHex(r, g, b));
                updateBackgroundColor(currentColor);
                [r, g, b, dir] = transformColor(r, g, b, dir);
                setTimeout(modes.rainbow.rainbow, 15, r, g, b, dir);
            }
        }
    }
}

let currentColor = "white";

// ----------------------------------------------------------------------------------

function handleColorChoice() {
    currentColor = document.getElementById("color").value;
    updateBackgroundColor(currentColor);
}

function toggleModeChoice(mode) {
    modes[mode].on = !modes[mode].on;

    // Turns off any other mode
    Object
        .keys(modes)
        .filter(m => m != mode)
        .forEach(m => {
            if (modes[m].on) modes[m].on = false;
        });

    // Activate mode
    if (modes[mode].on) {
        modes[mode].start();
    }
}

// ----------------------------------------------------------------------------------

function updateBackgroundColor(color) {
    document.getElementById("background").style.backgroundColor = color;
}

function updateCurrentColor(color) {
    currentColor = color;
    document.getElementById("color").value = currentColor;
}

// ----------------------------------------------------------------------------------

function transformColor(r, g, b, dir) {
    switch (dir) {
        case 1:
            r += 0x01;
            if (r == 0xff) {
                dir = -3;
            }
            break;
        case 2:
            g += 0x01;
            if (g == 0xff) {
                dir = -1;
            }
            break;
        case 3:
            b += 0x01;
            if (b == 0xff) {
                dir = -2;
            }
            break;
        case -1:
            r -= 0x01;
            if (r == 0x00) {
                dir = 3;
            }
            break;
        case -2:
            g -= 0x01;
            if (g == 0x00) {
                dir = 1;
            }
            break;
        case -3:
            b -= 0x01;
            if (b == 0x00) {
                dir = 2;
            }
            break;
    }

    return [r, g, b, dir];
}

function toColorHex(r, g, b) {
    return "#" + hexToString(r) + hexToString(g) + hexToString(b);
}

function hexToString(hex) {
    let str = hex.toString(16);
    if (str.length == 1) {
        str = "0" + str;
    }
    return str;
}