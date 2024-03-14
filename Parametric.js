
    // Функція для обчислення біноміального коефіцієнта
    function binomialCoefficient(n, k) {
        if (k === 0 || k === n) {
            return 1;
        } else {
            return binomialCoefficient(n - 1, k - 1) + binomialCoefficient(n - 1, k);
        }
    }

    // Функція для обчислення функції Бернштейна
    export function bernstein(n, i, t) {
        return binomialCoefficient(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i);
    }

    // Функція для обчислення координати x або y за параметром t
    function calculateCoordinate(points, t, axis) {
        const n = points.length - 1;
        let coordinate = 0;
        for (let i = 0; i <= n; i++) {
            coordinate += bernstein(n, i, t) * points[i][axis];
        }
        return coordinate;
    }

    // Функція для побудови кривої Безьє
    export function drawBezierCurve(ctx, controlPoints) {
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(controlPoints[0].x, controlPoints[0].y);
        const numPoints = 100; 
        for (let i = 1; i <= numPoints; i++) {
            const t = i / numPoints;
            const x = calculateCoordinate(controlPoints, t, 'x');
            const y = calculateCoordinate(controlPoints, t, 'y');
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
