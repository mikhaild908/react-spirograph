import React, { Component } from 'react';
import './Spirograph.css';

class Spirograph extends Component {
    constructor(props) {
        super(props);
        
        // this.drawFiftyThousandRandomCircles = this.drawFiftyThousandRandomCircles.bind(this);

        this.R1 = 0;
        this.r2 = 0;
        this.l = 0;

        this.xc = 0;
        this.yc = 0;
        this.k = 0;
        this.nRot = 0;

        this.gcd = this.gcd.bind(this);
        this.toRadians = this.toRadians.bind(this);
        this.getCanvasHeight = this.getCanvasHeight.bind(this);
        this.getCanvasWidth = this.getCanvasWidth.bind(this);
        this.setParameters = this.setParameters.bind(this);
        this.mapTo256 = this.mapTo256.bind(this);
        this.getColor = this.getColor.bind(this);
        this.drawSpirograph = this.drawSpirograph.bind(this);
    }

    render() {
        return (
            <div>
                <canvas id="canvas" ref="canvas" height="800" width="1000">
                </canvas>
            </div>
        );
    }

    gcd(a, b) {
        if (b) {
            return this.gcd(b, a % b);
        } else {
            return Math.abs(a);
        }
    }
    
    toRadians(theta) {
        return theta * (Math.PI / 180.0);
    }
    
    getCanvasHeight() {
        return this.refs.canvas.height;
    }
    
    getCanvasWidth() {
        return this.refs.canvas.width;
    }

    setParameters(xc, yc, R, r, l) {
        this.xc = xc;
        this.yc = yc;
        this.R1 = R;
        this.r2 = r;
        this.l = l;
    
        const gcdVal = this.gcd(this.r2, this.R1);
    
        this.k = r / R;
        this.nRot = r / gcdVal;
    }
    
    mapTo256(value, max) {
        return 256 / max * value;
    }

    getColor(r, g, b, a) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    drawSpirograph() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
        ctx.beginPath();
    
        // TODO:
        ctx.fillStyle = this.getColor(255, 255, 0, 1.0);
    
        let theta = 0;
        const R = this.R1;
        const k = this.k;
        const l = this.l;
    
        const max = 360 * this.nRot;
    
        for (let i = 0; i < 360 * this.nRot + 1; i++) {
          theta = this.toRadians(i);
    
          const x = R * ((1 - k) * Math.cos(theta) + l * k * Math.cos((1 - k) * theta / k));
          const y = R * ((1 - k) * Math.sin(theta) - l * k * Math.sin((1 - k) * theta / k));
    
          // ctx.fillStyle = this.getColor(0, this.mapTo256(i, max), this.mapTo256(i, max), 1);
    
          ctx.fillRect(this.xc + x, this.yc + y, 1, 1);
        }
    
        ctx.fill();
    }

    draw() {
        const { R1, r2, l } = this.props;
        this.setParameters(this.getCanvasWidth() / 2, this.getCanvasHeight() / 2, R1, r2, l);
        this.drawSpirograph();
    }
}

export default Spirograph;