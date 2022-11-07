import { gCodeConst } from "../const/gcode.const";

const EXTRUDER_SPEED = 0.03326; // jednostki E na jednostke odleglosci
const Z_POS = 0.2;

const SKIA_XY_RANGE = 330;
const PRINTER_XY_RANGE = 220;

let scale = PRINTER_XY_RANGE / SKIA_XY_RANGE;

const exportGCode = (props) => {
    let allCoordinates = []

    props.map((line) => {
        let coords = []
        let splittedLine = line.split(/[ML]/);
        
        if (splittedLine[0] == '') splittedLine.shift();

        coords[0] = [splittedLine[0].split(' ')[0], splittedLine[0].split(' ')[1], "NewLine"];
        splittedLine.shift();

        splittedLine.map((pair, index) => {
            coords[index + 1] = pair.split(' ');
        });

        allCoordinates = [...allCoordinates, ...coords]
    });

    let gCode = "";

    gCode = gCode.concat(gCodeConst.start);

    let extruderPosition = 0;

    allCoordinates.map((e, index) => {

        let newLine = '';
        let dExtrude = 0;

        // console.log(e);

        if(index == 0) {

            newLine = `\n G0 F2700 X${e[0]*scale} Y${(SKIA_XY_RANGE - e[1]) * scale} Z${Z_POS} E0`;

        } else if(e.length > 2) {

            newLine = `\n G0 X${e[0]*scale} Y${(SKIA_XY_RANGE - e[1]) * scale}`;

        } else {
            if(index > 1) {
                let xDiff = allCoordinates[index - 1][0] - e[0];
                let yDiff = allCoordinates[index - 1][1] - e[1];
                let length = Math.sqrt(Math.pow(xDiff*scale, 2) + Math.pow(yDiff*scale, 2))
                dExtrude = length * EXTRUDER_SPEED;
            }

            newLine = `\n G1 X${e[0]*scale} Y${(SKIA_XY_RANGE - e[1]) * scale} E${extruderPosition + dExtrude}`;

            extruderPosition += dExtrude;
        }

        gCode = gCode.concat(newLine);
    });
    console.log('---');
    gCode = gCode.concat(gCodeConst.end);
    console.log(gCode);
}

export default exportGCode;