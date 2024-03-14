import { RecursiveBezierCurve, DotsCurve} from './Recursive.js'
import { drawBezierCurve, bernstein } from './Parametric.js'


// Рекурсивний метод
document.addEventListener("DOMContentLoaded", function() {
    const buildByDotsButton = document.querySelector(".build-button1")
    buildByDotsButton.addEventListener("click", (event) => {
        let inputFieldCoordinates = document.querySelector('#inputFieldCoordinates').value
        console.log(inputFieldCoordinates);

        const matches = inputFieldCoordinates.match(/\(([^)]+)\)/g);
        if(matches){
            const controlPoints = matches.map((match, index) => {
                const coordinates = match.replace(/[()]/g, '').split(',');
                let color = 'red'; // Default color for control points

                // Check if it's the first or last point, which are anchor points
                if (index === 0 || index === matches.length - 1) {
                    color = 'blue'; // Anchor points color
                }
                return {
                    x: parseInt(coordinates[0], 10),
                    y: parseInt(coordinates[1], 10),
                    color: color,
                    isAnchorPoint: index === 0 || index === matches.length - 1 // Identify anchor points
                };
            });
            console.log(controlPoints)

            ctx.beginPath();
            ctx.closePath();

            controlPoints.forEach(point => {
                ctx.fillStyle = point.color;
                ctx.beginPath();
                ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw characteristic polyline
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(controlPoints[0].x, controlPoints[0].y);
            for (let i = 1; i < controlPoints.length; i++) {
                ctx.lineTo(controlPoints[i].x, controlPoints[i].y);
            }
            ctx.stroke();

            ctx.strokeStyle = "green"
            ctx.beginPath();
            ctx.moveTo(controlPoints[0].x, controlPoints[0].y);
            for (let t = 0; t <= 1; t += 0.01) {
                const point = RecursiveBezierCurve(controlPoints, t);
                ctx.lineTo(point.x, point.y);
            }
            ctx.stroke();
        }else{
            console.log('Рядок не містить координат у правильному форматі.')
        }
        event.preventDefault()
    });
});

let n = 0;
let controlPoints = [];

//Параметричний метод
document.addEventListener("DOMContentLoaded", function() {
    const buildCurveParam = document.querySelector('.build-button2')
    buildCurveParam.addEventListener("click", (event)=>{

        let inputParamCoordinates = document.querySelector('#inputFieldParamCoord').value
        console.log(inputParamCoordinates);
        const matches = inputParamCoordinates.match(/\(([^)]+)\)/g);

        if(matches){
             controlPoints = matches.map(match => {
                const coordinates = match.replace(/[()]/g, '').split(',');
                return {
                    x: parseInt(coordinates[0], 10),
                    y: parseInt(coordinates[1], 10)
                };
            })

            console.log(controlPoints);

            n = (controlPoints.length)-1

            drawBezierCurve(ctx, controlPoints);

        }
        event.preventDefault()

    })
});




document.addEventListener("DOMContentLoaded",function () {
    const displayDotsButton = document.querySelector('.display-dots-button')
    displayDotsButton.addEventListener("click", (event)=>{
        const DotsCoordinatesAmount = document.querySelector('#inputFieldAmountOfSpots').value

        let dots = [];
        for(let i = 0;i<DotsCoordinatesAmount;i++){
            const randomIndex = Math.floor(Math.random() * DotsCurve.length);
            dots.push(DotsCurve[randomIndex])
        }

        console.log(dots);
        alert(dots.map(dot => `(${dot.x}, ${dot.y})`).join('\n'));
        event.preventDefault()
    })
})


//обчислення значень поліномів
document.addEventListener("DOMContentLoaded", function () {
    const calculateValuePolynoms = document.querySelector('.Calculate-value-of-polynoms')
    calculateValuePolynoms.addEventListener("click",(event)=>{
        const FieldPolynom_i = parseInt(document.querySelector('.inputFieldPolynom-i').value);
        const FieldPolynom_t = document.querySelector('.inputFieldPolynom-t').value;

        const rangeValues = FieldPolynom_t.replace(/\[|\]/g, '').split(';')
        const t1 = parseFloat(rangeValues[0])
        const t2 = parseFloat(rangeValues[1])

        console.log(FieldPolynom_i, FieldPolynom_t, rangeValues, t1, t2);

        let output = [];

        for(let t = t1; t <= t2; t += 0.01){
            output.push(bernstein(n, FieldPolynom_i, t));
        }

        console.log("Output: ",output);

        const alertMessage = output.map(value => `(${value})`).join('\n');
        alert(alertMessage);

        event.preventDefault();
    })
})