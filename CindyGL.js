(function() {
    'use strict';
    var aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value)
        },
        d = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
    function ba(a, b) {
        if (b) {
            var c = d;
            a = a.split(".");
            for (var e = 0; e < a.length - 1; e++) {
                var f = a[e];
                f in c || (c[f] = {});
                c = c[f]
            }
            a = a[a.length - 1];
            e = c[a];
            b = b(e);
            b != e && null != b && aa(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    }
    ba("String.prototype.repeat", function(a) {
        return a ? a : function(a) {
            if (null == this)
                throw new TypeError("The 'this' value for String.prototype.repeat must not be null or undefined");
            var b = this;
            if (0 > a || 1342177279 < a)
                throw new RangeError("Invalid count value");
            a |= 0;
            for (var e = ""; a;)
                if (a & 1 && (e += b), a >>>= 1)
                    b += b;
            return e
        }
    });
    function ca() {
        ca = function() {};
        d.Symbol || (d.Symbol = ea)
    }
    var ea = function() {
        var a = 0;
        return function(b) {
            return "jscomp_symbol_" + (b || "") + a++
        }
    }();
    function fa() {
        ca();
        var a = d.Symbol.iterator;
        a || (a = d.Symbol.iterator = d.Symbol("iterator"));
        "function" != typeof Array.prototype[a] && aa(Array.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function() {
                return ha(this)
            }
        });
        fa = function() {}
    }
    function ha(a) {
        var b = 0;
        return ia(function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        })
    }
    function ia(a) {
        fa();
        a = {
            next: a
        };
        a[d.Symbol.iterator] = function() {
            return this
        };
        return a
    }
    ba("Array.from", function(a) {
        return a ? a : function(a, c, e) {
            fa();
            c = null != c ? c : function(a) {
                return a
            };
            var b = [],
                h = a[Symbol.iterator];
            if ("function" == typeof h)
                for (a = h.call(a); !(h = a.next()).done;)
                    b.push(c.call(e, h.value));
            else {
                h = a.length;
                for (var k = 0; k < h; k++)
                    b.push(c.call(e, a[k]))
            }
            return b
        }
    });
    function ja(a, b) {
        fa();
        a instanceof String && (a += "");
        var c = 0,
            e = {
                next: function() {
                    if (c < a.length) {
                        var f = c++;
                        return {
                            value: b(f, a[f]),
                            done: !1
                        }
                    }
                    e.next = function() {
                        return {
                            done: !0,
                            value: void 0
                        }
                    };
                    return e.next()
                }
            };
        e[Symbol.iterator] = function() {
            return e
        };
        return e
    }
    ba("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return ja(this, function(a) {
                return a
            })
        }
    });
    ba("Array.prototype.fill", function(a) {
        return a ? a : function(a, c, e) {
            var b = this.length || 0;
            0 > c && (c = Math.max(0, b + c));
            if (null == e || e > b)
                e = b;
            e = Number(e);
            0 > e && (e = Math.max(0, b + e));
            for (c = Number(c || 0); c < e; c++)
                this[c] = a;
            return this
        }
    });
    var ka = {
        addc: "vec2 addc(vec2 a,vec2 b){\nreturn a+b;\n}\n",
        addpoints: "vec2 addpoints(vec3 a,vec3 b){\nreturn dehomogenize(a) +dehomogenize(b);\n}\n",
        arccosc: "vec2 arccosc(vec2 a){\nvec2 t2=multc(a,negc(a));\nvec2 tmp=sqrtc(addc(vec2(1.0,0.0),t2));\nvec2 tmp1=addc(multc(a,vec2(0.0,1.0)),tmp);\nvec2 erg=addc(multc(logc(tmp1),vec2(0.0,1.0)),vec2(pi*0.5,0.0));\nreturn erg;\n}\n",
        arccosf: "vec2 arccosf(float z){\nif(abs(z)<=1.)return vec2(acos(z),0.);\nelse if(z>1.)return vec2(0,log(z+sqrt(z*z-1.)));\nelse return vec2(pi, -log(-z+sqrt(z*z-1.)));\n}\n",
        arcsinc: "vec2 arcsinc(vec2 a){\nvec2 t2=multc(a,negc(a));\nvec2 tmp=sqrtc(addc(vec2(1.0,0.0),t2));\nvec2 tmp1=addc(multc(a,vec2(0.0,1.0)),tmp);\nvec2 erg=multc(logc(tmp1),vec2(0.0,-1.0));\nreturn erg;\n}\n",
        arcsinf: "vec2 arcsinf(float z){\nif(abs(z)<=1.)return vec2(asin(z),0.);\nelse if(z>1.)return vec2(pi*.5, -log(z+sqrt(z*z-1.)));\nelse return vec2(-pi*.5,log(-z+sqrt(z*z-1.)));\n}\n",
        arctan2c: "\n\n\n\nvec2 arctan2c(vec2 x,vec2 y){\nvec2 r=logc(divc(x+vec2(-y.y,y.x),sqrtc(multc(x,x)+multc(y,y))));\nreturn vec2(r.y, -r.x);\n}\n",
        arctan2cvec2: "vec2 arctan2cvec2(cvec2 v){\nreturn arctan2c(v.real,v.imag);\n}\n",
        arctan2vec2: "float arctan2vec2(vec2 v){\nreturn atan(v.y,v.x);\n}\n",
        arctanc: "vec2 arctanc(vec2 a){\nvec2 t1=logc(addc(multc(a,vec2(0.0,-1.0)),vec2(1.0,0.0)));\nvec2 t2=logc(addc(multc(a,vec2(0.0,1.0)),vec2(1.0,0.0)));\nvec2 erg=multc(subc(t1,t2),vec2(0.0,0.5));\nreturn erg;\n}\n",
        blue: "vec3 blue(float f)\n{\nreturn vec3(0.,0.,clamp(f,0.,1.));\n}\n",
        cimag: "float imagc(vec2 a){\nreturn a.y;\n}\n",
        conjugate: "vec2 conjugate(vec2 a){\nreturn vec2(a.x, -a.y);\n}\n",
        copytexture_f: "#ifdef GL_ES\nprecision highp float;\n#endif\n\nuniform sampler2D sampler;\nvarying vec2 cgl_pixel;\n\nvoid main(void){\ngl_FragColor=texture2D(sampler,cgl_pixel);\n}\n",
        copytexture_v: "attribute vec3 aPos;\nattribute vec2 aTexCoord;\nvarying vec2 cgl_pixel;\n\nvoid main(void){\ngl_Position=vec4(aPos,1.);\ncgl_pixel=aTexCoord;\n}\n",
        cosc: "vec2 cosc(vec2 a){\n\nfloat n=exp(a.y);\nfloat imag1=n*sin(-a.x);\nfloat real1=n*cos(-a.x);\nn=exp(-a.y);\nfloat imag2=n*sin(a.x);\nfloat real2=n*cos(a.x);\nfloat i= (imag1+imag2) /2.0;\nfloat r= (real1+real2) /2.0;\n\nreturn vec2(r,i);\n}\n",
        creal: "float realc(vec2 a){\nreturn a.x;\n}\n",
        dehomogenize: "vec2 dehomogenize(vec3 z){\nreturn vec2(z.x,z.y)/z.z;\n}\n",
        dehomogenizex: "float dehomogenizex(vec3 z){\nreturn z.x/z.z;\n}\n",
        dehomogenizey: "float dehomogenizey(vec3 z){\nreturn z.y/z.z;\n}\n",
        det2: "float det2(mat2 a){\nreturn a[0][0]*a[1][1] -a[0][1]*a[1][0];\n}\n",
        det3: "float det3(mat3 a){\nreturn dot(cross(a[0],a[1]),a[2]);\n}\n",
        det3v: "float det3v(vec3 a,vec3 b,vec3 c){\nreturn dot(cross(a,b),c);\n}\n",
        det4: "float det4(mat4 a){\nfloat s00=a[0][0]*a[1][1] -a[0][1]*a[1][0],\ns01=a[0][0]*a[1][2] -a[0][2]*a[1][0],\ns02=a[0][0]*a[1][3] -a[0][3]*a[1][0],\ns03=a[0][1]*a[1][2] -a[0][2]*a[1][1],\ns04=a[0][1]*a[1][3] -a[0][3]*a[1][1],\ns05=a[0][2]*a[1][3] -a[0][3]*a[1][2],\ns06=a[2][0]*a[3][1] -a[2][1]*a[3][0],\ns07=a[2][0]*a[3][2] -a[2][2]*a[3][0],\ns08=a[2][0]*a[3][3] -a[2][3]*a[3][0],\ns09=a[2][1]*a[3][2] -a[2][2]*a[3][1],\ns10=a[2][1]*a[3][3] -a[2][3]*a[3][1],\ns11=a[2][2]*a[3][3] -a[2][3]*a[3][2];\nreturn s00*s11-s01*s10+s02*s09+s03*s08-s04*s07+s05*s06;\n}\n",
        divc: "vec2 divc(vec2 a,vec2 b){\nreturn vec2(dot(a,b),dot(a,vec2(-b.y,b.x)))/dot(b,b);\n}\n",
        divfc: "vec2 divfc(float a,vec2 b){\nreturn a*vec2(b.x,-b.y)/dot(b,b);\n}\n",
        expc: "vec2 expc(vec2 a){\nfloat n=exp(a.x);\nfloat r=n*cos(a.y);\nfloat i=n*sin(a.y);\nreturn vec2(r,i);\n}\n",
        float2color: "vec4 float2color(float f)\n{\nreturn vec4(f,f,f,1.);\n}\n",
        gray: "vec3 gray(float f)\n{\nf=clamp(f,0.,1.);\nreturn vec3(f,f,f);\n}\n",
        green: "vec3 green(float f)\n{\nreturn vec3(0.,clamp(f,0.,1.),0.);\n}\n",
        hsv2rgb: "vec3 hsv2rgb(vec3 c)\n{\nvec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);\nvec3 p=abs(fract(c.xxx+K.xyz) *6.0-K.www);\nreturn c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);\n}\n",
        hue: "vec3 hue(float a){\nreturn hsv2rgb(vec3(a,1.,1.));\n}\n",
        imagc: "float imagc(vec2 a){\nreturn a.y;\n}\n",
        invc: "vec2 invc(vec2 a){\nfloat n=a.x*a.x+a.y*a.y;\nreturn vec2(a.x/n,-a.y/n);\n}\n",
        logc: "vec2 logc(vec2 a){\nfloat re=a.x;\nfloat im=a.y;\nfloat s=sqrt(re*re+im*im);\nfloat i=im;\nfloat imag=atan(im,re);\nif(i<0.0){\nimag+= (2.0*pi);\n}\nif(i==0.0&&re<0.0){\nimag=pi;\n}\nif(imag>pi){\nimag-= (2.0*pi);\n};\nfloat real=log(s);\n\nreturn vec2(real,imag);\n}\n",
        logr: "vec2 logr(float a){\nif(a>=0.)return vec2(log(a),0);\nelse return vec2(log(-a),pi);\n}\n",
        mat2complex: "mat4 mat2complex(mat2 a)\n{\nreturn mat4(\nvec4(a[0][0],0,a[0][1],0),\nvec4(0,a[0][0],0,a[0][1]),\nvec4(a[1][0],0,a[1][1],0),\nvec4(0,a[1][0],0,a[1][1])\n);\n}\n",
        multc: "vec2 multc(vec2 a,vec2 b){\nreturn vec2(dot(a,vec2(b.x,-b.y)),dot(a,b.yx));\n}\n",
        negc: "vec2 negc(vec2 a){\nreturn vec2(-a.x,-a.y);\n}\n",
        powc: "vec2 powc(vec2 a,vec2 b){\nreturn(b.x==0. &&b.y==0.) ?vec2(1.,0.) : ((a.x==0. &&a.y==0.) ?vec2(0.) :expc(multc(logc(a),b)));\n}\n",
        powi: "float powi(float a,int b){\nif(mod(float(b),2.) < .5)\nreturn pow(abs(a),float(b));\nelse\nreturn sign(a)*pow(abs(a),float(b));\n}\n",
        random: "uniform float rnd_;\n\nfloat last_rnd= .1231;\nfloat random(){\nfloat a=fract(132422.21*sin(dot(plain_pixel,343433.671228*vec2(.176574+last_rnd, .1131+rnd_))));\nfloat b=fract(last_rnd*2321.2312*sin(dot(plain_pixel+vec2(rnd_,last_rnd),plain_pixel) *43758.5453));\nlast_rnd=fract(rnd_ +last_rnd+a+b);\nreturn last_rnd;\n}\n",
        randomnormal: "float randomnormal(){\nreturn sqrt(-2. *log(random())) *cos(6.283185307179586*random());\n}\n",
        realc: "float realc(vec2 a){\nreturn a.x;\n}\n",
        red: "vec3 red(float f)\n{\nreturn vec3(clamp(f,0.,1.),0.,0.);\n}\n",
        rgb2hsv: "vec3 rgb2hsv(vec3 c)\n{\nvec4 K=vec4(0.0, -1.0/3.0,2.0/3.0, -1.0);\nvec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));\nvec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));\n\nfloat d=q.x-min(q.w,q.y);\nfloat e=1.0e-10;\nreturn vec3(abs(q.z+ (q.w-q.y) / (6.0*d+e)),d/ (q.x+e),q.x);\n}\n",
        sinc: "\n\nvec2 sinc(vec2 a){\n\nfloat n=exp(a.y);\nfloat imag1=n*sin(-a.x);\nfloat real1=n*cos(-a.x);\nn=exp(-a.y);\nfloat imag2=n*sin(a.x);\nfloat real2=n*cos(a.x);\nfloat r= -(imag1-imag2) /2.0;\nfloat i= (real1-real2) /2.0;\n\nreturn vec2(r,i);\n}\n",
        sqrtc: "vec2 sqrtc(vec2 a){\nreturn expc(multc(logc(a),vec2(0.5,0.0)));\n}\n",
        sqrtf: "vec2 sqrtf(float a){\nif(a>=0.)return vec2(sqrt(a),0.);\nelse return vec2(0.,sqrt(-a));\n}\n",
        standardFragmentHeader: "#ifdef GL_ES\nprecision highp float;\nprecision highp int;\n#endif\n\n#define pi 3.141592653589793\n\nvarying vec2 cgl_pixel;\nvarying vec2 plain_pixel;\n",
        subc: "vec2 subc(vec2 a,vec2 b){\nreturn a-b;\n}\n",
        subpoints: "vec2 subpoints(vec3 a,vec3 b){\nreturn dehomogenize(a) -dehomogenize(b);\n}\n",
        tanc: "vec2 tanc(vec2 a){\nvec2 s=sinc(a);\nvec2 c=cosc(a);\nreturn divc(s,c);\n}\n",
        vec2complex: "vec4 vec2complex(vec2 a)\n{\nreturn vec4(a.x,0.,a.y,0);\n}\n",
        vshader: "attribute vec3 aPos;\nattribute vec2 aTexCoord;\nvarying vec2 cgl_pixel;\nvarying vec2 plain_pixel;\nuniform mat3 transformMatrix;\nvoid main(void){\ngl_Position=vec4(aPos,1.);\nplain_pixel=aTexCoord;\nvec3 r=transformMatrix*vec3(plain_pixel,1);\ncgl_pixel=r.xy/r.z;\n}\n"
    };
    var la = !1,
        g,
        m,
        n,
        ma,
        r,
        t,
        w = !1,
        na,
        x = !1,
        qa = !1,
        ra = 1;
    function sa() {
        function a(c) {
            g.removeEventListener("webglcontextcreationerror", a, !1);
            c.statusMessage && (b = c.statusMessage)
        }
        if (!la) {
            g = document.createElement("canvas");
            g.id = "glcanvas";
            g.style.display = "none";
            g.width = g.height = 0;
            document.body.appendChild(g);
            m = document.createElement("canvas");
            m.id = "tmpcanvas";
            m.style.display = "none";
            m.width = m.height = 0;
            document.body.appendChild(m);
            n = document.createElement("canvas");
            n.id = "dummycanvas";
            n.style.display = "none";
            n.width = n.height = 1;
            document.body.appendChild(n);
            ma =
            {
                ctype: "image",
                value: {
                    img: n,
                    width: 1,
                    height: 1,
                    ready: !0,
                    live: !1,
                    generation: 0,
                    whenReady: function() {}
                }
            };
            var b = "Unknown";
            g.addEventListener("webglcontextcreationerror", a, !1);
            (r = g.getContext("webgl")) || (r = g.getContext("experimental-webgl"));
            if (!r)
                throw new ta("Could not obtain a WebGL context.\nReason: " + b);
            g.removeEventListener("webglcontextcreationerror", a, !1);
            qa || (x = r.getExtension("OES_texture_float") && r.getExtension("OES_texture_float_linear"), x || (console.error("Your browser does not suppert OES_texture_float, trying OES_texture_half_float..."),
            (w = (na = r.getExtension("OES_texture_half_float")) && r.getExtension("OES_texture_half_float_linear")) || console.error("Your browser does not suppert OES_texture_half_float, will use 8-bit textures.")), navigator.userAgent.match(/(iPad|iPhone)/i) && (console.log("You are  using an iPhone/iPad."), x = w = !1, r.getExtension("OES_texture_half_float") && r.getExtension("OES_texture_half_float_linear") && r.getExtension("EXT_color_buffer_half_float") ? w = !0 : console.error("Your browser does not suppert writing to half_float textures, we will use 8-bit textures.")));
            la = !0
        }
    }
    ;
    function ua(a) {
        if (null == a || "object" != typeof a)
            return a;
        if (a instanceof Array) {
            var b = [];
            for (var c = 0, e = a.length; c < e; c++)
                b[c] = ua(a[c]);
            return b
        }
        if (a instanceof Object) {
            b = {};
            for (c in a)
                a.hasOwnProperty(c) && (0 <= "oper impl args ctype stack name arglist value real imag key obj body".split(" ").indexOf(c) && (b[c] = ua(a[c])), a.modifs && (b.modifs = a.modifs));
            return b
        }
    }
    function va(a, b) {
        if (null == a || "object" != typeof a)
            return a === b;
        if (a instanceof Array && b instanceof Array) {
            if (a.length != b.length)
                return !1;
            for (var c = 0, e = a.length; c < e; c++)
                if (!va(a[c], b[c]))
                    return !1;
            return !0
        }
        if (a instanceof Object && b instanceof Object) {
            c = "oper impl args ctype stack name modifs arglist value real imag key obj body".split(" ");
            for (e = 0; e < c.length; e++) {
                var f = c[e];
                if (!va(a[f], b[f]))
                    return !1
            }
            return !0
        }
        return !1
    }
    function y(a) {
        return -1 === a.indexOf("$") ? a : a.substr(0, a.indexOf("$"))
    }
    function wa(a) {
        if ("boolean" === a.ctype)
            return z.B;
        if ("number" === a.ctype)
            return a = a.value, 1E-5 > Math.abs(a.imag) ? (a.real | 0) === a.real ? z.v : z.f : z.h;
        if ("list" === a.ctype) {
            var b = a.value;
            if (3 === b.length) {
                if ("Point" === a.usage)
                    return z.A;
                if ("Line" === a.usage)
                    return z.line
            }
            if (0 < b.length) {
                for (var c = wa(b[0]), e = 1; e < b.length; e++)
                    c = A(c, wa(b[e]));
                if (c)
                    return {
                        type: "list",
                        length: b.length,
                        parameters: c
                    }
            }
        } else {
            if ("string" === a.ctype || "image" === a.ctype)
                return z.image;
            if ("geo" === a.ctype && "L" === a.value.kind)
                return z.line
        }
        console.error("Cannot guess type of the following type:");
        console.log(a);
        return !1
    }
    var xa = 0;
    function ya() {
        xa++;
        return "_h" + xa
    }
    function za(a, b) {
        if (a > g.width || b > g.height)
            g.width = Math.ceil(a), g.height = Math.ceil(b)
    }
    var Aa = {};
    function Ba(a, b) {
        Aa[b] || (Aa[b] = a.instance.parse(b));
        a = a.evaluate(Aa[b]);
        return a.ctype && "number" === a.ctype ? a.value.real : 0
    }
    function Ca(a) {
        return {
            x: Ba(a, "(screenbounds()_4).x"),
            y: Ba(a, "(screenbounds()_4).y")
        }
    }
    function Da(a) {
        return {
            x: Ba(a, "(screenbounds()_3).x"),
            y: Ba(a, "(screenbounds()_3).y")
        }
    }
    var Ea = new Float32Array(1),
        Fa = new Int32Array(Ea.buffer);
    function Ga(a) {
        Ea[0] = a;
        a = Fa[0];
        var b = a >> 16 & 32768,
            c = (a & 2147483647) + 4096;
        if (1199570944 <= c)
            return 1199570944 <= (a & 2147483647) ? 2139095040 > c ? b | 31744 : b | 31744 | (a & 8388607) >> 13 : b | 31743;
        if (947912704 <= c)
            return b | c - 939524096 >> 13;
        if (855638016 > c)
            return b;
        c = (a & 2147483647) >> 23;
        return b | (a & 8388607 | 8388608) + (8388608 >>> c - 102) >> 126 - c
    }
    function Ha(a) {
        if (x)
            return new Float32Array(a);
        if (w) {
            for (var b = new Uint16Array(a.length), c = 0; c < a.length; c++)
                b[c] = Ga(a[c]);
            return b
        }
        b = new Uint8Array(a.length);
        for (c = 0; c < a.length; c++)
            b[c] = 255 * a[c];
        return b
    }
    function Ia(a) {
        return x ? new Float32Array(a) : w ? new Uint16Array(a) : new Uint8Array(a)
    }
    function Ja() {
        return x ? r.FLOAT : w ? na.HALF_FLOAT_OES : r.UNSIGNED_BYTE
    }
    function Ka(a) {
        for (var b = [], c = 0; c < a.length; c++)
            if (x)
                b.push(a[c]);
            else if (w) {
                var e = a[c],
                    f = (e & 31744) >> 10,
                    h = e & 1023;
                b.push((e >> 15 ? -1 : 1) * (f ? 31 === f ? h ? NaN : Infinity : Math.pow(2, f - 15) * (1 + h / 1024) : h / 1024 * 6.103515625E-5))
            } else
                b.push(a[c] / 255);
        return b
    }
    function Ma(a) {
        for (var b = 1; b < a;)
            b <<= 1;
        return b
    }
    ;
    function Na(a, b, c) {
        if (a.canvaswrapper) {
            if (!a.ready || a.canvaswrapper.canvas != ma && a.canvaswrapper.L == a.width && a.canvaswrapper.G == a.height || (delete a.canvaswrapper, a.canvaswrapper = Na(a, b, c)), c) {
                b = a.canvaswrapper;
                var e = b.i;
                if (c && (c.repeat != e.repeat || c.N != e.N || c.S != e.S))
                    for (b.i = c, e = 0; 2 > e; e++)
                        r.bindTexture(r.TEXTURE_2D, b.l[e]), c.N ? r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, c.S ? r.LINEAR_MIPMAP_LINEAR : r.NEAREST_MIPMAP_LINEAR) : r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, c.S ? r.LINEAR : r.NEAREST),
                        r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, c.S ? r.LINEAR : r.NEAREST)
            }
        } else
            a.canvaswrapper = new Oa(a.ready ? a : ma, c || {
                S: !0,
                N: !1,
                repeat: !1
            }), a.ready || console.log("Image is not ready yet.");
        return a.canvaswrapper
    }
    function Oa(a, b) {
        this.canvas = a;
        this.i = b;
        this.L = a.width;
        this.G = a.height;
        Pa(this);
        this.R = 0;
        this.l = [];
        this.aa = [];
        this.generation = -1;
        this.bindTexture();
        a.drawTo = this.drawTo.bind(this);
        a.readPixels = this.qa.bind(this);
        a.cdyUpdate = this.sa.bind(this);
        a = Ia(this.V * this.M * 4);
        for (var c = 0; 2 > c; c++)
            this.l[c] = r.createTexture(), r.bindTexture(r.TEXTURE_2D, this.l[c]), r.pixelStorei(r.UNPACK_ALIGNMENT, 1), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, this.V, this.M, 0, r.RGBA, Ja(), a), b.N ? r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER,
            b.S ? r.LINEAR_MIPMAP_LINEAR : r.NEAREST_MIPMAP_LINEAR) : r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, b.S ? r.LINEAR : r.NEAREST), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, b.S ? r.LINEAR : r.NEAREST), this.aa[c] = r.createFramebuffer(), r.bindFramebuffer(r.FRAMEBUFFER, this.aa[c]), r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, this.l[c], 0);
        this.$ = new Qa(ka.copytexture_v, ka.copytexture_f);
        b = r.createBuffer();
        r.bindBuffer(r.ARRAY_BUFFER, b);
        b = new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0,
        1, 1, 0]);
        a = r.getAttribLocation(this.$.i, "aPos");
        r.enableVertexAttribArray(a);
        c = r.getAttribLocation(this.$.i, "aTexCoord");
        r.enableVertexAttribArray(c);
        var e = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
            f = b.byteLength;
        r.bufferData(r.ARRAY_BUFFER, f + e.byteLength, r.STATIC_DRAW);
        r.bufferSubData(r.ARRAY_BUFFER, 0, b);
        r.bufferSubData(r.ARRAY_BUFFER, f, e);
        r.vertexAttribPointer(a, 3, r.FLOAT, !1, 0, 0);
        r.vertexAttribPointer(c, 2, r.FLOAT, !1, 0, f)
    }
    function Pa(a) {
        a.V = Ma(a.L + a.L / 2 * (a.i.N && a.i.repeat));
        a.M = Ma(a.G + a.G / 2 * (a.i.N && a.i.repeat))
    }
    Oa.prototype.bindTexture = function() {
        r.bindTexture(r.TEXTURE_2D, this.l[this.R])
    };
    Oa.prototype.bindFramebuffer = function() {
        r.bindFramebuffer(r.FRAMEBUFFER, this.aa[this.R ^ 1]);
        this.R ^= 1
    };
    Oa.prototype.sa = function() {
        if (this.canvas.img.hasOwnProperty("getContext"))
            var a = this.canvas.img.getContext("2d");
        else
            this.canvas.img = document.createElement("canvas"), this.canvas.img.style.display = "none", this.canvas.img.width = this.L, this.canvas.img.height = this.G, a = this.canvas.img.getContext("2d");
        a.clearRect(0, 0, this.L, this.G);
        this.drawTo(a, 0, 0);
        this.canvas.img.generation++
    };
    function Ra(a) {
        if (!(a.canvas.live && (a.canvas.img.webkitDecodedFrameCount || a.canvas.img.i) && a.ma >= (a.canvas.img.webkitDecodedFrameCount || a.canvas.img.i) || !a.canvas.live && (!a.canvas.ready || a.generation >= a.canvas.generation))) {
            if (a.L != a.canvas.width || a.G != a.canvas.height) {
                a.L = a.canvas.width;
                a.G = a.canvas.height;
                Pa(a);
                for (var b = Ia(a.V * a.M * 4), c = 0; 2 > c; c++)
                    r.bindTexture(r.TEXTURE_2D, a.l[c]), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, a.V, a.M, 0, r.RGBA, Ja(), b)
            }
            a.bindTexture();
            r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, 1);
            a.i.repeat ? (m.width = a.V, m.height = a.M, b = m.getContext("2d"), b.drawImage(a.canvas.img, 0, a.M - a.G), b.drawImage(a.canvas.img, a.L, a.M - a.G), b.drawImage(a.canvas.img, 0, a.M - 2 * a.G), b.drawImage(a.canvas.img, a.L, a.M - 2 * a.G), r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, r.RGBA, Ja(), m)) : r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, r.RGBA, Ja(), a.canvas.img);
            a.i.N && r.generateMipmap(r.TEXTURE_2D);
            r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, 0);
            a.generation = a.canvas.generation;
            a.ma = Math.min(a.ma + 1, a.canvas.img.webkitDecodedFrameCount || a.canvas.img.i)
        }
    }
    Oa.prototype.drawTo = function(a, b, c) {
        za(this.V, this.M);
        r.viewport(0, 0, this.V, this.M);
        r.useProgram(this.$.i);
        r.activeTexture(r.TEXTURE0);
        r.bindTexture(r.TEXTURE_2D, this.l[this.R]);
        this.$.l.sampler([0]);
        r.bindFramebuffer(r.FRAMEBUFFER, null);
        r.drawArrays(r.TRIANGLE_STRIP, 0, 4);
        r.flush();
        a.drawImage(g, 0, g.height - this.G, this.L, this.G, b, c, this.L, this.G)
    };
    Oa.prototype.qa = function(a, b, c, e) {
        r.bindFramebuffer(r.FRAMEBUFFER, this.aa[this.R]);
        r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, this.l[this.R], 0);
        var f = Ia(c * e * 4);
        r.readPixels(a, this.G - b - e, c, e, r.RGBA, Ja(), f);
        a = [];
        for (--e; 0 <= e; e--)
            a = a.concat(Ka(f.slice(e * c * 4, (e + 1) * c * 4)));
        return a
    };
    function Sa(a, b) {
        this.C = a;
        this.R = b;
        Ta(this)
    }
    function Ta(a) {
        var b = Ua(new Va(a.C), a.R);
        a.l = b.D;
        a.O = b.O;
        a.ia = b.ia;
        a.$ = ka.standardFragmentHeader + b.code;
        a.aa = ka.vshader;
        a.i = new Qa(a.aa, a.$);
        b = r.createBuffer();
        r.bindBuffer(r.ARRAY_BUFFER, b);
        b = new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]);
        var c = r.getAttribLocation(a.i.i, "aPos");
        r.enableVertexAttribArray(c);
        a = r.getAttribLocation(a.i.i, "aTexCoord");
        r.enableVertexAttribArray(a);
        var e = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
            f = b.byteLength;
        r.bufferData(r.ARRAY_BUFFER, f + e.byteLength, r.STATIC_DRAW);
        r.bufferSubData(r.ARRAY_BUFFER,
        0, b);
        r.bufferSubData(r.ARRAY_BUFFER, f, e);
        r.vertexAttribPointer(c, 3, r.FLOAT, !1, 0, 0);
        r.vertexAttribPointer(a, 2, r.FLOAT, !1, 0, f)
    }
    function Wa(a) {
        function b(a, c, e) {
            if (a)
                if ("function" === typeof a)
                    switch (c) {
                    case z.h:
                        a([e.value.real, e.value.imag]);
                        break;
                    case z.B:
                        e.value ? a([1]) : a([0]);
                        break;
                    case z.v:
                    case z.f:
                        a([e.value.real]);
                        break;
                    case z.A:
                    case z.line:
                        "geo" === e.ctype ? a(e.value.homog.value.map(function(a) {
                            return a.value.real
                        })) : "list" === e.ctype && 2 === e.value.length ? a(e.value.map(function(a) {
                            return a.value.real
                        }).concat([1])) : "list" === e.ctype && 3 === e.value.length && a(e.value.map(function(a) {
                            return a.value.real
                        }));
                        break;
                    default:
                        if ("list" ===
                        c.type && c.parameters === z.f)
                            a(e.value.map(function(a) {
                                return a.value.real
                            }));
                        else if ("list" === c.type && "list" === c.parameters.type && c.parameters.parameters === z.f) {
                            for (var f = [], h = 0; h < c.length; h++)
                                for (var k = 0; k < c.parameters.length; k++)
                                    f.push(e.value[h].value[k].value.real);
                            a(f)
                        } else
                            console.error("Don't know how to set uniform of type " + B(c) + ", to " + e)
                    }
                else if ("list" === c.type)
                    if (h = Xa(c), 1 === C(c) && h === z.f) {
                        c = Ya(c.length);
                        var l = 0;
                        for (f in c)
                            b(a["a" + f], z.ea(c[f]), {
                                ctype: "list",
                                value: E(c[f]).map(function(a) {
                                    return e.value[l +
                                    a]
                                })
                            }), l += c[f]
                    } else
                        for (f = 0; f < c.length; f++)
                            b(a["a" + f], c.parameters, {
                                ctype: "list",
                                value: e.value[f].value
                            });
                else
                    console.error("Don't know how to set uniform of type " + B(c) + ", to"), console.log(e)
        }
        for (var c in a.l) {
            var e = a.C.evaluateAndVal(a.l[c].X),
                f = a.l[c].type;
            if (!F(Za(e), f)) {
                console.log("Type of " + c + " changed (" + B(Za(e)) + " is no subtype of  " + B(f) + "); forcing rebuild.");
                Ta(a);
                r.useProgram(a.i.i);
                Wa(a);
                return
            }
            a.i.l[c] && b(a.i.l[c], f, e)
        }
        [["rnd_", function() {
            return [Math.random()]
        }], ["_lowerleft", function() {
            var b =
            Ca(a.C);
            return [b.x, b.y]
        }], ["_lowerright", function() {
            var b = Da(a.C);
            return [b.x, b.y]
        }]].map(function(b) {
            return a.i.l[b[0]] && a.i.l[b[0]](b[1]())
        })
    }
    function $a(a) {
        var b = 0,
            c;
        for (c in a.O) {
            r.activeTexture(r.TEXTURE0 + b);
            var e = a.O[c],
                f = e.name;
            e = ab(e);
            Ra(e);
            e.bindTexture();
            [["_sampler" + f, [b]], ["_ratio" + f, [e.L / e.G]], ["_cropfact" + f, [e.L / e.V, e.G / e.M]]].map(function(b) {
                return a.i.l[b[0]] && a.i.l[b[0]](b[1])
            });
            b++
        }
    }
    ;
    CindyJS.registerPlugin(1, "CindyGL", function(a) {
        function b(b, e, f, h, k, l) {
            if (!b.oa || b.na < ra)
                b.oa = !0, b.na = ra, b.ra = new Sa(a, b);
            b = b.ra;
            a:
            {
                for (c in b.ia)
                    if (b.C.getMyfunction(c).generation > b.ia[c]) {
                        console.log(c + " is outdated; forcing rebuild.");
                        var c = !1;
                        break a
                    }
                c = !0
            }c || Ta(b);
            var u = k / h;
            c = e.x + -(f.y - e.y) * u;
            u = e.y + (f.x - e.x) * u;
            za(h, k);
            l ? r.viewport(0, 0, h, k) : r.viewport(0, g.height - k, h, k);
            r.useProgram(b.i.i);
            Wa(b);
            e = [f.x - e.x, c - e.x, e.x, f.y - e.y, u - e.y, e.y, 0, 0, 1];
            b.i.l.hasOwnProperty("transformMatrix") && b.i.l.transformMatrix([e[0],
            e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]]);
            $a(b);
            l ? (l.bindFramebuffer(), l.generation = ++l.canvas.generation) : r.bindFramebuffer(r.FRAMEBUFFER, null);
            r.drawArrays(r.TRIANGLE_STRIP, 0, 4);
            r.flush();
            l && (l.generation = Math.max(l.generation, l.canvas.generation + 1))
        }
        t = a.nada;
        a.defineFunction("compile", 1, function(b) {
            b = Ua(new Va(a), b[0]);
            console.log(b);
            return {
                ctype: "string",
                value: b
            }
        });
        a.defineFunction("use8bittextures", 0, function() {
            qa = !0;
            x = w = !1;
            console.log("Switching to 8-bit textures mode.");
            return a.nada
        });
        a.defineFunction("forcerecompile",
        0, function() {
            ra++;
            return t
        });
        a.defineFunction("colorplot", 1, function(c) {
            sa();
            var e = a.instance.canvas.width,
                f = a.instance.canvas.height;
            b(c[0], Ca(a), Da(a), e, f, null);
            c = a.instance.canvas.getContext("2d");
            c.save();
            c.setTransform(1, 0, 0, 1, 0, 0);
            c.drawImage(g, 0, 0, e, f, 0, 0, e, f);
            c.restore();
            return t
        });
        a.defineFunction("colorplot", 3, function(c) {
            sa();
            var e = c[0],
                f = a.extractPoint(a.evaluateAndVal(c[1])),
                h = a.extractPoint(a.evaluateAndVal(c[2])),
                k = {
                    x: Math.min(f.x, h.x),
                    y: Math.min(f.y, h.y)
                },
                l = {
                    x: Math.max(f.x, h.x),
                    y: Math.min(f.y,
                    h.y)
                },
                q = Math.min(f.x, h.x),
                u = Math.max(f.y, h.y);
            c = a.instance.canvas.width;
            var p = a.instance.canvas.height;
            var v = Ba(a, "(screenbounds()_1).x");
            var D = Ba(a, "(screenbounds()_1).y");
            var da = Da(a),
                La = Math.abs((f.x - h.x) / (da.x - v));
            f = Math.abs((f.y - h.y) / (da.y - D));
            b(e, k, l, c * La, p * f, null);
            e = a.instance.canvas.getContext("2d");
            a.getInitialMatrix();
            v = c * (q - v) / (da.x - v);
            D = p * (u - D) / (da.y - D);
            e.save();
            e.setTransform(1, 0, 0, 1, 0, 0);
            e.drawImage(g, 0, 0, c * La, p * f, v, D, c * La, p * f);
            e.restore();
            return t
        });
        a.defineFunction("colorplot", 4, function(c) {
            sa();
            var e = a.extractPoint(a.evaluateAndVal(c[0])),
                f = a.extractPoint(a.evaluateAndVal(c[1])),
                h = a.evaluateAndVal(c[2]);
            c = c[3];
            if (!e.ok || !f.ok || "string" !== h.ctype)
                return t;
            h = a.getImage(h.value, !0);
            var k = Na(h, a, !1);
            b(c, e, f, h.width, h.height, k);
            return t
        });
        a.defineFunction("colorplot", 2, function(c) {
            sa();
            var e = Ca(a),
                f = Da(a),
                h = a.evaluateAndVal(c[0]);
            c = c[1];
            if ("string" !== h.ctype)
                return t;
            h = a.getImage(h.value, !0);
            var k = Na(h, a, !1);
            b(c, e, f, h.width, h.height, k);
            return t
        });
        a.defineFunction("setpixel", 4, function(b) {
            var c =
            a.evaluateAndVal(b[0]);
            var f = void 0 === f ? null : f;
            if ("string" === c.ctype)
                var h = c.value;
            else
                console.log("argument is not a string"), h = f;
            c = bb(a.evaluateAndVal(b[1]));
            f = bb(a.evaluateAndVal(b[2]));
            b = cb(a.evaluateAndVal(b[3]));
            if (!h)
                return t;
            var k = a.getImage(h, !0);
            k = Na(k, a, !1);
            isFinite(c) && isFinite(f) && h && k && b && (k.bindTexture(), h = [b[0], b[1], b[2], 1], r.texSubImage2D(r.TEXTURE_2D, 0, c, f, 1, 1, r.RGBA, Ja(), Ha(h)), b = k.canvas.img.getContext("2d"), k = b.createImageData(1, 1), k.data.d = h, b.putImageData(k, c, f));
            return t
        })
    });
    function G(a, b) {
        return {
            type: "list",
            length: a,
            parameters: b
        }
    }
    function Za(a) {
        return {
            type: "constant",
            value: a
        }
    }
    function db(a) {
        return Za({
            ctype: "number",
            value: {
                real: a,
                imag: 0
            }
        })
    }
    var z = {
        B: 1,
        v: 2,
        f: 3,
        h: 4,
        W: 5,
        color: 6,
        A: 7,
        line: 8,
        K: 9,
        image: 10,
        F: G(2, 3),
        J: G(3, 3),
        P: G(4, 3),
        ea: function(a) {
            return G(a, 3)
        },
        ha: function(a) {
            return G(a, 4)
        },
        ba: G(2, G(2, 3)),
        ca: G(3, G(3, 3)),
        da: G(4, G(4, 3))
    };
    Object.freeze(z);
    function B(a) {
        return 1 <= a && 10 >= a ? "bool int float complex voidt color point line coordinate2d image".split(" ")[a - 1] : "list" === a.type ? B(a.parameters) + "[" + a.length + "]" : "constant" === a.type ? "const[" + JSON.stringify(a.value.value) + "]" : JSON.stringify(a)
    }
    function H(a) {
        return "list" === a.type && H(a.parameters) || F(a, z.f)
    }
    function I(a) {
        return "list" === a.type && I(a.parameters) || F(a, z.h)
    }
    function eb(a) {
        return "constant" === a.type && F(a, z.v)
    }
    function J(a) {
        return "constant" === a.type ? wa(a.value) : a
    }
    function C(a) {
        return "list" === a.type ? C(a.parameters) + 1 : 0
    }
    function Xa(a) {
        return void 0 !== a.parameters ? Xa(a.parameters) : a
    }
    function fb(a, b) {
        return C(a) === C(b) && (0 === C(a) || a.length === b.length && fb(a.parameters, b.parameters))
    }
    function K(a) {
        return F(a, z.f) ? z.f : F(a, z.h) ? z.h : {
            type: "list",
            length: a.length,
            parameters: K(a.parameters)
        }
    }
    function gb(a) {
        return F(a, z.h) ? z.h : {
            type: "list",
            length: a.length,
            parameters: gb(a.parameters)
        }
    }
    function L(a) {
        return "constant" === a.type && L(J(a)) || a === z.B || a === z.v || a === z.f || a === z.h || a === z.A || a === z.line || "list" === a.type && a.parameters === z.f && 1 <= a.length && 4 >= a.length || "list" === a.type && "list" === a.parameters.type && a.parameters.parameters === z.f && a.length === a.parameters.length && 2 <= a.length && 4 >= a.length
    }
    function hb(a) {
        return -1 !== [z.B, z.v, z.f, z.h].indexOf(a)
    }
    function ib(a, b) {
        return a === b || "constant" === a.type && "constant" === b.type && va(a.value, b.value) || "list" === a.type && "list" === b.type && a.length === b.length && ib(a.parameters, b.parameters)
    }
    function F(a, b) {
        return ib(a, b) ? !0 : a ? hb(a) && hb(b) ? a <= b : "constant" === b.type ? !1 : "constant" === a.type ? F(wa(a.value), b) : b === z.K ? F(a, z.h) || F(a, z.F) || F(a, z.A) : b === z.A ? F(a, z.J) || F(a, z.F) : b === z.line ? F(a, z.J) : b === z.color ? F(a, z.f) || "list" === a.type && (3 === a.length || 4 === a.length) && F(a.parameters, z.f) : "list" === a.type && "list" === b.type && a.length === b.length ? F(a.parameters, b.parameters) : !1 : !1
    }
    function A(a, b) {
        if (!a)
            return b;
        if (!b || ib(a, b))
            return a;
        "constant" === a.type && (a = wa(a.value));
        "constant" === b.type && (b = wa(b.value));
        return hb(a) && hb(b) ? Math.max(a, b) : "list" === a.type && "list" === b.type && a.length === b.length && (b = A(a.parameters, b.parameters)) ? {
            type: "list",
            length: a.length,
            parameters: b
        } : !1
    }
    function M(a) {
        return function(b) {
            var c = {},
                e;
            for (e in a) {
                var f = a[e];
                c.ga = f[0];
                if (b.length == c.ga.length && b.every(function(a) {
                    return function(b, c) {
                        return F(b, a.ga[c])
                    }
                }(c)))
                    return {
                        s: c.ga,
                        u: f[1],
                        m: f[2]
                    };
                c = {
                    ga: c.ga
                }
            }
            return !1
        }
    }
    function jb(a) {
        switch (a) {
        case z.v:
            return M([[[z.B], z.v, N("int")]]);
        case z.f:
            return M([[[z.B], z.f, N("float")], [[z.v], z.f, N("float")]]);
        case z.h:
            return M([[[z.f], z.h, function(a) {
                return "vec2(" + a + ", 0.)"
            }]]);
        case z.color:
            return M([[[z.f], z.color, O("float2color")], [[z.J], z.color, function(a) {
                return "vec4(" + a + ",1.0)"
            }], [[z.P], z.color, P]]);
        case z.A:
            return M([[[z.F], z.A, function(a) {
                return "vec3(" + a + ",1.0)"
            }], [[z.J], z.A, P]]);
        case z.line:
            return M([[[z.F], z.line, function(a) {
                return "vec3(" + a + ",1.0)"
            }], [[z.J], z.line,
            P]]);
        case z.K:
            return M([[[z.h], z.K, P], [[z.F], z.K, P], [[z.A], z.K, O("dehomogenize")]]);
        default:
            if ("list" === a.type)
                return function(b) {
                    var c = b[0],
                        e = jb(a.parameters)([c.parameters]).m;
                    return {
                        s: b,
                        u: a,
                        m: function(b, h, k) {
                            return kb(a)(E(a.length).map(function(a) {
                                return e([Q(c, a)([b], h, k)], h, k)
                            }), h, k)
                        }
                    }
                }
        }
        console.log("no inclusionfunction ->" + B(a) + " implemented yet; using identity...");
        return function(b) {
            return {
                s: b,
                u: a,
                m: P
            }
        }
    }
    function R(a) {
        a = J(a);
        switch (a) {
        case z.B:
            return "bool";
        case z.v:
            return "int";
        case z.f:
            return "float";
        case z.h:
        case z.K:
            return "vec2";
        case z.W:
            return "void";
        case z.color:
            return "vec4";
        case z.A:
        case z.line:
            return "vec3"
        }
        if ("list" === a.type && a.parameters === z.f)
            return 1 == a.length ? "float" : "vec" + a.length;
        if ("list" === a.type && a.parameters === z.h)
            return "cvec" + a.length;
        if ("list" === a.type && "list" === a.parameters.type && a.length === a.parameters.length && a.parameters.parameters === z.f)
            switch (a.length) {
            case 2:
                return "mat2";
            case 3:
                return "mat3";
            case 4:
                return "mat4"
            }
        if ("list" === a.type)
            return "l" + a.length + "_" + R(a.parameters);
        console.error("No WebGL implementation for type " + B(a) + " found")
    }
    function lb(a, b) {
        switch (b) {
        case z.B:
            return R(b) + "(" + a.value + ")";
        case z.v:
            return "" + (a.value.real | 0);
        case z.f:
            return R(b) + "(" + a.value.real + ")";
        case z.h:
            return R(b) + "(" + a.value.real + ", " + a.value.imag + ")";
        case z.color:
            return a = a.value.real, "vec4(" + a + "," + a + "," + a + ",1.)";
        default:
            console.error("Dont know how to paste values of Type " + B(b) + " yet.")
        }
    }
    ;
    var S = {};
    function mb(a, b, c) {
        if (!c.mark("includedfunctions", a)) {
            for (var e in S[a])
                mb(S[a][e], b, c);
            c.add("includedfunctions", a, function() {
                return ka[a]
            })
        }
    }
    function O(a) {
        return function(b, c, e) {
            mb(a, c, e);
            return N(a)(b)
        }
    }
    ;
    function E(a) {
        return Array.from(Array(a).keys())
    }
    function Ya(a) {
        return 4 >= a ? [a] : 5 == a ? [2, 3] : Ya(a - 4).concat([4])
    }
    function nb(a) {
        var b = Xa(a),
            c = C(a);
        return 1 == c && b === z.f ? Ya(a.length).map(function(a, b) {
            return {
                type: z.ea(a),
                name: "a" + b
            }
        }) : 1 <= c ? E(a.length).map(function(b) {
            return {
                type: a.parameters,
                name: "a" + b
            }
        }) : []
    }
    function ob(a, b) {
        if (!L(a)) {
            var c = R(a);
            b.add("structs", c, function() {
                return "struct " + c + " { " + nb(a).map(function(a) {
                    return ob(a.type, b) || R(a.type) + " " + a.name + ";"
                }).join("") + "};"
            })
        }
    }
    function pb(a, b, c) {
        if (!L(a)) {
            var e = a.length,
                f = a.parameters.length;
            c.add("functions", "mult" + e + "_" + f, function() {
                return R(z.ea(e)) + " mult" + e + "_" + f + "(" + R(a) + " a, " + R(z.ea(f)) + " b){return " + qb(e)(E(e).map(function(a) {
                    return rb(f)(["a.a" + a, "b"], b, c)
                }), b, c) + ";}"
            })
        }
    }
    function sb(a, b, c) {
        if (!(L(a) && 1 >= C(a))) {
            var e = a.length,
                f = "sum" + R(a);
            c.add("functions", f, function() {
                return R(a.parameters) + " " + f + "(" + R(a) + " a){" + (R(a.parameters) + " res = " + tb(a.parameters, 0)([], b, c) + ";\n      " + E(e).map(function(e) {
                    return "res = " + ub(a.parameters)(["res", Q(a, e)(["a", e], b, c)], b, c) + ";"
                }).join("\n") + "\n        return res;\n    }")
            })
        }
    }
    function vb(a, b, c) {
        var e = a.length,
            f = a.parameters.length;
        c.add("functions", "multc" + e + "_" + f, function() {
            return R(z.ha(e)) + " multc" + e + "_" + f + "(" + R(a) + " a, " + R(z.ha(f)) + " b){\n        return cvec" + e + "(" + E(e).map(function(a) {
                return wb(f)(["a.a" + a, "b"], b, c)
            }) + ");\n    }\n    "
        })
    }
    function xb(a, b) {
        2 <= a && 4 >= a || b.add("functions", "dot" + a, function() {
            return "float dot" + a + "(vec" + a + " a, vec" + a + " b) {\n    return " + Ya(a).map(function(a, b) {
                return "dot(a.a" + b + ",b.a" + b + ")"
            }).join("+") + "; }\n    "
        })
    }
    function yb(a, b) {
        b.add("functions", "cdot" + a, function() {
            return "vec2 cdot" + a + "(cvec" + a + " a, cvec" + a + " b) {\n      return " + E(a).map(function(a) {
                return "vec2(dot(a.a" + a + ",vec2(b.a" + a + ".x,-b.a" + a + ".y)), dot(a.a" + a + ",b.a" + a + ".yx))"
            }).join("+\n") + ";\n    }\n    "
        })
    }
    function zb(a, b, c) {
        var e = "add" + R(a);
        c.add("functions", e, function() {
            return R(a) + " " + e + "(" + R(a) + " a, " + R(a) + " b) {\n    return " + R(a) + "(" + nb(a).map(function(a) {
                return R(a.type) + "(" + ub(a.type)(["a." + a.name, "b." + a.name], b, c) + ")"
            }).join(",") + ");\n      }"
        })
    }
    function Ab(a, b, c) {
        var e = "sub" + R(a);
        c.add("functions", e, function() {
            return R(a) + " " + e + "(" + R(a) + " a, " + R(a) + " b) {\n    return " + R(a) + "(" + nb(a).map(function(a) {
                return R(a.type) + "(" + Bb(a.type)(["a." + a.name, "b." + a.name], b, c) + ")"
            }).join(",") + ");\n    }"
        })
    }
    function Cb(a, b, c) {
        var e = "scalarmult" + R(a);
        c.add("functions", e, function() {
            return R(a) + " " + e + "(float a, " + R(a) + " b) {\n    return " + R(a) + "(" + nb(a).map(function(a) {
                return R(a.type) + "(" + Db(a.type)(["a", "b." + a.name], b, c) + ")"
            }).join(",") + ");\n    }"
        })
    }
    function Eb(a, b, c) {
        mb("multc", b, c);
        var e = "cscalarmult" + R(a);
        c.add("functions", e, function() {
            return R(a) + " " + e + "(vec2 a, " + R(a) + " b) {\n    return " + R(a) + "(" + nb(a).map(function(a) {
                return "" + Fb(a.type)(["a", "b." + a.name], b, c)
            }).join(",") + ");\n    }"
        })
    }
    function Gb(a) {
        if (a === z.h)
            return O("multc");
        if (L(a))
            return function(a) {
                return T("*")([a[1], a[0]])
            };
        var b = Xa(a);
        if (F(b, z.f))
            return function(b, e, f) {
                return pb(a, e, f) || "mult" + a.length + "_" + a.parameters.length + "(" + b.join(",") + ")"
            };
        if (b === z.h)
            return function(b, e, f) {
                return vb(a, e, f) || "multc" + a.length + "_" + a.parameters.length + "(" + b.join(",") + ")"
            }
    }
    function rb(a) {
        return function(b, c, e) {
            return xb(a, e) || "dot" + (2 <= a && 4 >= a ? "" : a) + "(" + b.join(",") + ")"
        }
    }
    function wb(a) {
        return function(b, c, e) {
            return yb(a, e) || "cdot" + a + "(" + b.join(",") + ")"
        }
    }
    function ub(a) {
        return L(a) ? T("+") : function(b, c, e) {
            return zb(a, c, e) || "add" + R(a) + "(" + b.join(",") + ")"
        }
    }
    function Bb(a) {
        return L(a) ? T("-") : function(b, c, e) {
            return Ab(a, c, e) || "sub" + R(a) + "(" + b.join(",") + ")"
        }
    }
    function Hb(a) {
        return H(a) && 1 == C(a) ? function(b, c, e) {
            return rb(a.length)([b[0], qb(a.length)(Array(a.length).fill("1."), c, e)], c, e)
        } : function(b, c, e) {
            return sb(a, c, e) || "sum" + R(a) + "(" + b.join(",") + ")"
        }
    }
    function qb(a) {
        if (2 <= a && 4 >= a)
            return function(b) {
                return "vec" + a + "(" + b.join(",") + ")"
            };
        if (1 == a)
            return function(a) {
                return "float(" + a.join(",") + ")"
            };
        var b = 0;
        return function(c, e, f) {
            return ob(z.ea(a), f) || "vec" + a + "(" + Ya(a).map(function(a) {
                    return "vec" + a + "(" + E(a).map(function() {
                        return ++b && c[b - 1]
                    }).join(",") + ")"
                }).join(",") + ")"
        }
    }
    function kb(a) {
        var b = C(a);
        return L(a) ? function(b) {
            return R(a) + "(" + b.join(",") + ")"
        } : 1 == b && a.parameters === z.f ? qb(a.length) : function(b, e, f) {
            return ob(a, f) || R(a) + "(" + b.join(",") + ")"
        }
    }
    function Q(a, b) {
        var c = Xa(a);
        return 1 == C(a) && c === z.f ? Ib(a.length, b) : L(a) ? function(a) {
            return "(" + a[0] + ")[" + b + "]"
        } : function(a) {
            return "(" + a[0] + ").a" + b
        }
    }
    function tb(a, b) {
        return L(a) ? function() {
            return R(a) + "(float(" + b + "))"
        } : function(c, e, f) {
            return kb(a) + "(" + nb(a).map(function(a) {
                return tb(a.type, b)(c, e, f)
            }).join(",") + ")"
        }
    }
    function Ib(a, b) {
        return function(c) {
            if (1 == a)
                return c[0];
            if (2 <= a && 4 >= a)
                return "(" + c[0] + ")[" + b + "]";
            a:
            {
                var e = b;
                var f = Ya(a),
                    h;
                for (h in f)
                    if (f[h] <= e)
                        e -= f[h];
                    else {
                        e = {
                            first: h,
                            second: e
                        };
                        break a
                    }
                console.error("Accessing index out of range");
                e = void 0
            }return "(" + c[0] + ").a" + e.first + "[" + e.second + "]"
        }
    }
    function Db(a) {
        return L(a) ? T("*") : function(b, c, e) {
            return Cb(a, c, e) || "scalarmult" + R(a) + "(" + b.join(",") + ")"
        }
    }
    function Fb(a) {
        return a === z.h ? O("multc") : function(b, c, e) {
            return Eb(a, c, e) || "cscalarmult" + R(a) + "(" + b.join(",") + ")"
        }
    }
    function Jb(a, b, c) {
        var e = "reverse" + R(a);
        c.add("functions", e, function() {
            return R(a) + " " + e + "(" + R(a) + " a){" + (R(a.parameters) + " m;\n") + E(Math.floor(a.length / 2)).map(function(e) {
                var f = Q(a, e)(["a", e], b, c);
                e = Q(a, a.length - 1 - e)(["a", a.length - 1 - e], b, c);
                return "m = " + f + "; " + f + " = " + e + "; " + e + " = m;"
            }).join("\n") + "return a;\n      }"
        })
    }
    function Kb(a) {
        return function(b, c, e) {
            return Jb(a, c, e) || "reverse" + R(a) + "(" + b.join(",") + ")"
        }
    }
    function Lb(a, b, c) {
        var e = "max" + R(a);
        c.add("functions", e, function() {
            return R(a.parameters) + " " + e + "(" + R(a) + " a){" + (R(a.parameters) + " m = " + Q(a, a.length - 1)(["a", a.length - 1], b, c) + ";\n") + E(a.length - 1).map(function(e) {
                return "m = max(m," + Q(a, e)(["a", e], b, c) + ");"
            }).join("\n") + "return m;\n      }"
        })
    }
    function Mb(a) {
        return function(b, c, e) {
            return Lb(a, c, e) || "max" + R(a) + "(" + b.join(",") + ")"
        }
    }
    function Nb(a, b, c) {
        var e = "min" + R(a);
        c.add("functions", e, function() {
            return R(a.parameters) + " " + e + "(" + R(a) + " a){" + (R(a.parameters) + " m = " + Q(a, a.length - 1)(["a", a.length - 1], b, c) + ";\n") + E(a.length - 1).map(function(e) {
                return "m = min(m," + Q(a, e)(["a", e], b, c) + ");"
            }).join("\n") + "return m;\n      }"
        })
    }
    function Ob(a) {
        return function(b, c, e) {
            return Nb(a, c, e) || "min" + R(a) + "(" + b.join(",") + ")"
        }
    }
    function Pb(a, b, c) {
        var e = "transpose" + R(a),
            f = G(a.parameters.length, G(a.length, a.parameters.parameters));
        c.add("functions", e, function() {
            return R(f) + " " + e + "(" + R(a) + " a){return " + kb(f)(E(f.length).map(function(e) {
                return kb(f.parameters)(E(f.parameters.length).map(function(f) {
                    return Q(a.parameters, e)([Q(a, f)(["a", f], b, c), e], b, c)
                }), b, c)
            }), b, c) + ";}"
        })
    }
    function Qb(a) {
        return function(b, c, e) {
            return Pb(a, c, e) || "transpose" + R(a) + "(" + b.join(",") + ")"
        }
    }
    ;
    function Rb(a) {
        function b(a, e, k) {
            if (1 < e) {
                var f = e / 2 | 0;
                b(a, f, !k);
                b(a + f, e - f, k);
                c(a, e, k)
            }
        }
        function c(a, b, k) {
            if (1 < b) {
                var f;
                for (f = 1; f < b;)
                    f <<= 1;
                f >>= 1;
                for (var h = a; h < a + b - f; h++) {
                    var u = h,
                        p = h + f;
                    k ? e.push([u, p]) : e.push([p, u])
                }
                c(a, f, k);
                c(a + f, b - f, k)
            }
        }
        var e = [];
        b(0, a, !0);
        return e
    }
    function Sb(a, b, c) {
        var e = "sort" + R(a);
        c.add("functions", e, function() {
            return R(a) + " " + e + "(" + R(a) + " a){" + (R(a.parameters) + " m;\n") + Rb(a.length).map(function(e) {
                var f = Q(a, e[0])(["a", e[0]], b, c);
                e = Q(a, e[1])(["a", e[1]], b, c);
                return "m = min(" + f + "," + e + "); " + e + " = max(" + f + "," + e + "); " + f + " = m;"
            }).join("\n") + "return a;\n      }"
        })
    }
    function Tb(a) {
        return function(b, c, e) {
            return Sb(a, c, e) || "sort" + R(a) + "(" + b.join(",") + ")"
        }
    }
    ;
    function N(a) {
        return function(b) {
            return y(a) + "(" + b + ")"
        }
    }
    function T(a) {
        return function(b) {
            return "(" + b.join(a) + ")"
        }
    }
    function U() {
        return function(a) {
            return "(" + a.reverse().join("*") + ")"
        }
    }
    function P(a) {
        return a
    }
    var V = {};
    V.join = M([[[z.A, z.A], z.line, N("cross")]]);
    V.meet = M([[[z.line, z.line], z.A, N("cross")]]);
    V.gauss = M([[[z.h], z.F, P]]);
    V.complex = M([[[z.F], z.h, P], [[z.A], z.h, O("dehomogenize")]]);
    V["if"] = function(a) {
        if (!a.every(function(a) {
            return a
        }))
            return !1;
        if (2 === a.length)
            return {
                s: a,
                u: a[1],
                m: function(a) {
                    return "if(" + a[0] + ") {" + a[1] + ";}"
                }
            };
        if (3 === a.length) {
            var b = A(a[1], a[2]);
            return b ? {
                s: [z.B, b, b],
                u: b,
                m: function(a) {
                    return "(" + a[0] + " ? " + a[1] + " : " + a[2] + ")"
                }
            } : {
                s: a,
                u: z.W,
                m: function(a) {
                    return "if(" + a[0] + ") {" + a[1] + ";} else {" + a[2] + ";}"
                }
            }
        }
        return !1
    };
    V["="] = function(a) {
        a = A(a[0], a[1]);
        return {
            s: a,
            u: a,
            m: function(a) {
                return a[0] + " = " + a[1] + ";"
            }
        }
    };
    V[";"] = function(a) {
        return {
            s: a,
            u: a[1] !== z.W ? a[1] : a[0],
            m: function(a) {
                return a[0] + " ; " + a[1] + ";"
            }
        }
    };
    V.repeat = function(a) {
        return 2 != a.length && 3 != a.length || !eb(a[0]) ? !1 : {
            s: a,
            u: a[a.length - 1],
            m: function() {
                return ""
            }
        }
    };
    V.forall = function(a) {
        return 2 != a.length && 3 != a.length || "list" !== J(a[0]).type ? !1 : {
            s: a,
            u: a[a.length - 1],
            m: function() {
                return ""
            }
        }
    };
    V.apply = function(a) {
        return 2 != a.length && 3 != a.length || "list" !== J(a[0]).type ? !1 : {
            s: a,
            u: G(J(a[0]).length, a[a.length - 1]),
            m: function() {
                return ""
            }
        }
    };
    V.sum = function(a) {
        return 1 == a.length && (H(a[0]) || I(a[0])) ? {
            s: a,
            u: a[0].parameters,
            m: Hb(a[0])
        } : !1
    };
    V.regional = function(a) {
        return {
            s: a,
            u: z.W,
            m: function() {
                return ""
            }
        }
    };
    V.sqrt = M([[[z.f], z.h, O("sqrtf")], [[z.h], z.h, O("sqrtc")]]);
    V.abs = M([[[z.f], z.f, N("abs")], [[z.h], z.f, N("length")], [[z.F], z.f, N("length")], [[z.J], z.f, N("length")], [[z.P], z.f, N("length")]]);
    V.abs_infix = V.abs;
    V.dist = M([[[z.f, z.f], z.f, function(a) {
        return N("abs")(T("-")(a))
    }], [[z.h, z.h], z.f, function(a) {
        return N("length")(T("-")(a))
    }], [[z.F, z.F], z.f, function(a) {
        return N("length")(T("-")(a))
    }], [[z.J, z.J], z.f, function(a) {
        return N("length")(T("-")(a))
    }], [[z.P, z.P], z.f, function(a) {
        return N("length")(T("-")(a))
    }]]);
    V.dist_infix = V.dist;
    V.sin = M([[[z.f], z.f, N("sin")], [[z.h], z.h, O("sinc")]]);
    V.cos = M([[[z.f], z.f, N("cos")], [[z.h], z.h, O("cosc")]]);
    V.tan = M([[[z.f], z.f, N("tan")], [[z.h], z.h, O("tanc")]]);
    V.exp = M([[[z.f], z.f, N("exp")], [[z.h], z.h, O("expc")]]);
    V.arctan = M([[[z.f], z.f, N("atan")], [[z.h], z.h, O("arctanc")]]);
    V.arcsin = M([[[z.f], z.h, O("arcsinf")], [[z.h], z.h, O("arcsinc")]]);
    V.arccos = M([[[z.f], z.h, O("arccosf")], [[z.h], z.h, O("arccosc")]]);
    V.log = M([[[z.f], z.h, O("logr")], [[z.h], z.h, O("logc")]]);
    var Ub = [2, 3, 4].map(function(a) {
            return G(a, z.f)
        }).concat([2, 3, 4].map(function(a) {
            return G(a, G(a, z.f))
        })),
        Vb = [z.v, z.f, z.h].concat(Ub);
    V.add = function(a) {
        var b = M(Vb.map(function(a) {
            return [[a, a], a, T("+")]
        }).concat([[[z.A, z.A], z.F, O("addpoints")]]))(a);
        if (b)
            return b;
        b = a[0];
        a = a[1];
        if ([b, a].every(function(a) {
            return H(a) || I(a)
        }) && fb(b, a))
            return a = A(K(b), K(a)), {
                s: [a, a],
                u: a,
                m: ub(a)
            }
    };
    V.sub = function(a) {
        var b = M(Vb.map(function(a) {
            return [[a, a], a, T("-")]
        }).concat(Vb.map(function(a) {
            return [[z.W, a], a, T("-")]
        })).concat([[[z.A, z.A], z.F, O("subpoints")]]))(a);
        if (b)
            return b;
        b = a[0];
        a = a[1];
        if ([b, a].every(function(a) {
            return H(a) || I(a)
        }) && fb(b, a))
            return a = A(K(b), K(a)), {
                s: [a, a],
                u: a,
                m: Bb(a)
            }
    };
    V["+"] = V.add;
    V["-"] = V.sub;
    V._ = function(a) {
        var b = J(a[0]);
        if (b === z.A || b === z.line)
            b = z.J;
        if ("list" === b.type && eb(a[1])) {
            var c = Number(a[1].value.value.real);
            return 1 <= Math.abs(c) && Math.abs(c) <= b.length ? (0 < c && --c, 0 > c && (c = b.length + c), {
                s: a,
                u: b.parameters,
                m: Q(b, c)
            }) : {
                s: a,
                u: b.parameters,
                m: function() {
                    return console.error("try to access " + c + "-th Element of " + b.length + "-list " + JSON.stringify(a[0]))
                }
            }
        }
        return !1
    };
    V.mult = function(a) {
        var b = M([[[z.v, z.v], z.v, T("*")], [[z.f, z.f], z.f, T("*")], [[z.h, z.f], z.h, T("*")], [[z.f, z.h], z.h, T("*")], [[z.h, z.h], z.h, O("multc")], [[z.ba, z.ba], z.ba, U()], [[z.ca, z.ca], z.ca, U()], [[z.da, z.da], z.da, U()], [[z.ba, z.F], z.F, U()], [[z.ca, z.J], z.J, U()], [[z.da, z.P], z.P, U()], [[z.F, z.ba], z.F, U()], [[z.J, z.ca], z.J, U()], [[z.P, z.da], z.P, U()]])(a);
        if (b)
            return b;
        if (2 !== a.length)
            return !1;
        b = a[0];
        var c = a[1];
        if ([b, c].every(function(a) {
            return "list" === a.type && F(a.parameters, z.f)
        }) && b.length === c.length)
            return a =
            K(b), L(a) ? {
                s: [a, a],
                u: z.f,
                m: N("dot")
            } : {
                s: [a, a],
                u: z.f,
                m: rb(b.length)
            };
        if ([b, c].every(function(a) {
            return "list" === a.type && F(a.parameters, z.h)
        }) && b.length === c.length)
            return a = gb(b), {
                s: [a, a],
                u: z.h,
                m: wb(b.length)
            };
        if (H(b) && 2 === C(b) && H(c) && 1 === C(c) && b.parameters.length === c.length)
            return {
                s: [K(b), K(c)],
                u: z.ea(b.length),
                m: Gb(K(b))
            };
        if (I(b) && 2 === C(b) && I(c) && 1 === C(c) && b.parameters.length === c.length)
            return {
                s: [gb(b), gb(c)],
                u: z.ha(b.length),
                m: Gb(gb(b))
            };
        for (b = {
            H: 0
        }; 2 > b.H; b = {
            Y: b.Y,
            H: b.H,
            fa: b.fa
        }, b.H++) {
            if (F(a[0 ^ b.H],
            z.f) && (H(a[1 ^ b.H]) || I(a[1 ^ b.H])))
                return b.Y = K(a[1 ^ b.H]), {
                    s: b.H ? [b.Y, z.f] : [z.f, b.Y],
                    u: b.Y,
                    m: function(a) {
                        return function(b, c, e) {
                            return Db(a.Y)([b[0 ^ a.H], b[1 ^ a.H]], c, e)
                        }
                    }(b)
                };
            if (F(a[0 ^ b.H], z.h) && I(a[1 ^ b.H]))
                return b.fa = gb(a[1 ^ b.H]), {
                    s: b.H ? [b.fa, z.h] : [z.h, b.fa],
                    u: b.fa,
                    m: function(a) {
                        return function(b, c, e) {
                            return Fb(a.fa)([b[0 ^ a.H], b[1 ^ a.H]], c, e)
                        }
                    }(b)
                }
        }
    };
    V["*"] = V.mult;
    V.div = function(a) {
        var b = M([[[z.f, z.f], z.f, T("/")], [[z.f, z.h], z.h, O("divfc")], [[z.h, z.f], z.h, T("/")], [[z.h, z.h], z.h, O("divc")]])(a);
        return b ? b : F(a[1], z.f) && I(a[0]) && (a = K(a[0]), L(a)) ? {
            s: [a, z.f],
            u: a,
            m: T("/")
        } : !1
    };
    V["/"] = V.div;
    V.re = M([[[z.h], z.f, O("realc")]]);
    V.im = M([[[z.h], z.f, O("imagc")]]);
    V.floor = M([[[z.f], z.v, function(a) {
        return "int(floor(" + a + "))"
    }], [[z.h], z.h, N("floor")]]);
    V.round = M([[[z.f], z.v, function(a) {
        return "int(floor(" + a + "+.5))"
    }], [[z.h], z.h, function(a) {
        return "floor(" + a + "+vec2(.5))"
    }]]);
    V.ceil = M([[[z.f], z.v, function(a) {
        return "int(ceil(" + a + "))"
    }], [[z.h], z.h, N("ceil")]]);
    V.mod = M([[[z.v, z.v], z.v, function(a, b) {
        return "int(" + N("mod")("float(" + a[0] + "), float(" + a[1] + ")", b) + ")"
    }], [[z.f, z.f], z.f, N("mod")], [[z.h, z.h], z.h, O("mod")]]);
    V.random = M([[[], z.f, O("random")], [[z.f], z.f, function(a, b, c) {
        return O("random")([], b, c) + "*" + a[0]
    }], [[z.h], z.h, function(a, b, c) {
        return "vec2(" + O("random")([], b, c) + "," + O("random")([], b, c) + ")*" + a[0]
    }]]);
    V.randomint = M([[[z.v], z.v, function(a, b, c) {
        return "int(floor(" + O("random")([], b, c) + "*float(" + a[0] + ")))"
    }], [[z.f], z.v, function(a, b, c) {
        return "int(floor(" + O("random")([], b, c) + "*floor(" + a[0] + ")))"
    }]]);
    V.randominteger = V.randomint;
    V.randombool = M([[[], z.B, function(a, b, c) {
        return "(" + O("random")([], b, c) + ">.5)"
    }]]);
    V.randomnormal = M([[[], z.f, O("randomnormal")]]);
    V.arctan2 = M([[[z.f, z.f], z.f, function(a) {
        return "atan(" + a[1] + ", " + a[0] + ")"
    }], [[z.h, z.h], z.h, O("arctan2c")], [[z.h], z.f, O("arctan2vec2")], [[z.F], z.f, O("arctan2vec2")], [[z.ha(2)], z.h, O("arctan2cvec2")]]);
    ["red", "green", "blue", "gray", "hue"].forEach(function(a) {
        V[a] = M([[[z.f], z.J, O(a)]])
    });
    V.grey = V.gray;
    V.min = function(a) {
        var b = M([[[z.f, z.f], z.f, N("min")]])(a);
        if (b)
            return b;
        if (1 === a.length && 1 === C(a[0]) && H(a[0]))
            return {
                s: a,
                u: a[0].parameters,
                m: Ob(a[0])
            }
    };
    V.max = function(a) {
        var b = M([[[z.v, z.v], z.v, N("max")], [[z.f, z.f], z.f, N("max")]])(a);
        if (b)
            return b;
        if (1 === a.length && 1 === C(a[0]) && H(a[0]))
            return {
                s: a,
                u: a[0].parameters,
                m: Mb(a[0])
            }
    };
    function Wb(a, b) {
        if (!(1 >= a))
            if (2 == a)
                b.add("functions", "raise2", function() {
                    return "float raise2(float a) { return a*a; }"
                });
            else {
                Wb(2, b);
                var c = function(a, b) {
                        return 1 == b ? a : b & 1 ? c(a, b - 1) + "*a" : "raise2(" + c(a, b / 2) + ")"
                    },
                    e = "raise" + a;
                b.add("functions", e, function() {
                    return "float " + e + "(float a) { return " + c("a", a) + ";}"
                })
            }
    }
    function Xb(a) {
        return function(b, c, e) {
            return 0 == a ? "1." : 1 == a ? b[0] : Wb(a, e) || "raise" + a + "(" + b[0] + ")"
        }
    }
    V.pow = function(a) {
        if (eb(a[1]) && F(a[0], z.f)) {
            var b = Number(a[1].value.value.real);
            if (0 <= b)
                return {
                    s: [z.f, a[1]],
                    u: z.f,
                    m: Xb(b)
                }
        }
        return M([[[z.f, z.v], z.f, O("powi")], [[z.h, z.h], z.h, O("powc")]])(a)
    };
    V["^"] = V.pow;
    V.re = M([[[z.h], z.f, function(a) {
        return "(" + a + ").x"
    }]]);
    V.conjugate = M([[[z.h], z.h, O("conjugate")]]);
    V.im = M([[[z.h], z.f, function(a) {
        return "(" + a + ").y"
    }]]);
    V.genList = function(a) {
        var b = a.length;
        if (0 < b) {
            var c = !1,
                e;
            for (e in a)
                c = A(c, a[e]);
            if (c)
                return a = G(b, c), {
                    s: Array(b).fill(c),
                    u: a,
                    m: kb(a)
                }
        }
        return !1
    };
    V["&"] = M([[[z.B, z.B], z.B, T("&&")]]);
    V["%"] = M([[[z.B, z.B], z.B, T("||")]]);
    "> < >= <= == !=".split(" ").forEach(function(a) {
        V[a] = M([[[z.v, z.v], z.B, T(a)], [[z.f, z.f], z.B, T(a)]])
    });
    V["!"] = M([[[z.B], z.B, N("!")], [[z.W, z.B], z.B, function(a) {
        return N("!")([a[1]])
    }]]);
    V.not = V["!"];
    V.imagergb = M([[[z.image, z.K], z.J, Yb], [[z.K, z.K, z.image, z.K], z.J, Zb]]);
    V.imagergba = M([[[z.image, z.K], z.P, $b], [[z.K, z.K, z.image, z.K], z.P, ac]]);
    V.reverse = function(a) {
        return 1 === a.length && "list" === a[0].type ? {
            s: a,
            u: a[0],
            m: Kb(a[0])
        } : !1
    };
    V.sort = function(a) {
        return 1 === a.length && 1 === C(a[0]) && H(a[0]) ? {
            s: a,
            u: a[0],
            m: Tb(a[0])
        } : !1
    };
    V.transpose = function(a) {
        return 1 === a.length && 2 <= C(a[0]) ? {
            s: a,
            u: G(a[0].parameters.length, G(a[0].length, a[0].parameters.parameters)),
            m: Qb(a[0])
        } : !1
    };
    V.det = M([[[z.ba], z.f, O("det2")], [[z.ca], z.f, O("det3")], [[z.da], z.f, O("det4")], [[z.A, z.A, z.A], z.f, O("det3v")]]);
    Object.freeze(V);
    S.powc = ["expc", "multc", "logc"];
    S.sqrtc = ["expc", "multc", "logc"];
    S.arccosc = ["multc", "negc", "sqrtc", "addc", "logc"];
    S.arcsinc = ["multc", "negc", "sqrtc", "addc", "logc"];
    S.tanc = ["sinc", "cosc", "divc"];
    S.arctanc = ["logc", "addc", "multc", "subc"];
    S.arctan2c = ["logc", "divc", "sqrtc", "multc"];
    S.arctan2vec2c = ["arctan2c"];
    S.hue = ["hsv2rgb"];
    S.randomnormal = ["random"];
    S.subpoints = ["dehomogenize"];
    S.addpoints = ["dehomogenize"];
    Object.freeze(S);
    function Va(a) {
        this.j = {};
        this.D = {};
        this.i = {};
        this.T = 0;
        this.l = {};
        this.C = a;
        this.O = {}
    }
    Va.prototype.add = function(a, b, c) {
        this.mark(a, b);
        this.i[a].ka[b] || (this.i[a].ka[b] = c(), this.i[a].ja[b] = !0, this.i[a].order.push(b))
    };
    Va.prototype.mark = function(a, b) {
        this.i[a] || (this.i[a] = {
            order: [],
            ja: {},
            ka: {}
        });
        var c = this.i[a].ja[b] || !1;
        this.i[a].ja[b] = !0;
        return c
    };
    function bc(a, b) {
        return a.i[b] ? a.i[b].order.map(function(c) {
            return a.i[b].ka[c]
        }).join("\n") : "\n"
    }
    function W(a, b, c, e) {
        if (ib(c, e))
            return b;
        if (F(c, e)) {
            if ("constant" === c.type)
                return lb(c.value, e);
            var f = jb(e)([c]);
            if (!f)
                return console.error("cannot find an implementation for " + B(c) + " -> " + B(e) + ", using identity"), b;
            e = f.m;
            return e(W(a, b, c, f.s[0]), {}, a)
        }
        console.error(B(c) + " is no subtype of " + B(e) + " (trying to cast the term " + b + ")");
        return b
    }
    function X(a, b, c) {
        a.j[b] || (a.j[b] = {});
        a.j[b].U || (a.j[b].U = []);
        a.j[b].w || (a.j[b].w = !1);
        a.hasOwnProperty("global") || (a.j[b].global = c)
    }
    function cc(a, b) {
        var c = b.I;
        if (b.isuniform)
            return a.D[b.uvariable].type;
        if ("variable" === b.ctype)
            return b = b.name, b = c[b] || b, a.j[b].w;
        if ("function" === b.ctype && a.l.hasOwnProperty(b.oper))
            return a.j[c[b.oper]].w;
        if ("number" === b.ctype)
            return Za(b);
        if ("void" === b.ctype)
            return z.W;
        if ("field" === b.ctype) {
            a = J(Y(a, b.obj));
            if (1 == b.key.length) {
                if ("list" === a.type)
                    return a.parameters;
                if (F(a, z.A))
                    return z.f
            } else if ("xy" == b.key && F(a, z.A))
                return z.F;
            if (!a)
                return !1
        } else {
            if ("string" === b.ctype)
                return z.image;
            if ("function" ===
            b.ctype || "infix" === b.ctype) {
                c = Array(b.args.length);
                for (var e = !0, f = 0; f < b.args.length; f++)
                    c[f] = Y(a, b.args[f]), e &= "constant" === c[f].type;
                if (e && b.impl)
                    return b = {
                        ctype: b.ctype,
                        oper: b.oper,
                        impl: b.impl,
                        args: c.map(function(a) {
                            return a.value
                        })
                    }, b = a.C.evaluateAndVal(b), Za(b);
                a = y(b.oper);
                e = V[a] ? V[a](c) : !1;
                if (!e && c.every(function(a) {
                    return Xa(a)
                }))
                    throw console.error("Could not find an implementation for " + a + " with args (" + c.map(B).join(", ") + ")"), console.log(b), "error";
                return e ? e.u : !1
            }
        }
        console.error("Don't know how to compute type of");
        console.log(b);
        return !1
    }
    function Y(a, b) {
        if (!b.la || !b.T || a.T > b.T)
            b.la = cc(a, b), b.T = a.T;
        return b.la
    }
    function dc(a, b, c) {
        function e(a, b, c) {
            var e = {},
                f;
            for (f in a)
                e[f] = a[f];
            a = ya();
            X(l, a, !1);
            h[a].w = c;
            h[a].pa = !0;
            e[b] = a;
            return e
        }
        function f(a, b, c, v) {
            a.I = b;
            for (var p in a.args) {
                var q = v || "repeat$2" === a.oper && 0 == p || "repeat$3" === a.oper && 0 == p || "_" === a.oper && 1 == p,
                    u = b;
                -1 != ["repeat", "forall", "apply"].indexOf(y(a.oper)) && (1 == p ? u = "repeat$2" === a.oper ? e(b, "#", z.v) : "repeat$3" === a.oper ? e(b, a.args[1].name, z.v) : "forall$2" === a.oper || "apply$2" === a.oper ? e(b, "#", !1) : "forall$3" === a.oper || "apply$3" === a.oper ? e(b, a.args[1].name,
                !1) : b : 2 == p && (u = a.args[1].I));
                f(a.args[p], u, c, q)
            }
            "field" === a.ctype && f(a.obj, b, c, v);
            "variable" === a.ctype && (p = a.name, p = b[p] || p, v && l.j[p] && (l.j[p].Z = !0));
            if ("=" === a.oper)
                v = a.args[0].name, v = b[v] || v, X(l, v, !0), h[v].U.push(a.args[1]);
            else if (a.oper && "regional" === y(a.oper) && "global" != c)
                for (var oa in a.args) {
                    v = a.args[oa].name;
                    var pa = ya();
                    b[v] = pa;
                    k[c].j || (k[c].j = []);
                    k[c].j.push(pa);
                    X(l, pa, !1)
                }
            else if ("forall$2" === a.oper || "apply$2" === a.oper || "forall$3" === a.oper || "apply$3" === a.oper)
                h[2 === a.args.length ? a.args[1].I["#"] :
                a.args[2].I[a.args[1].name]].U.push({
                    ctype: "infix",
                    oper: "_",
                    args: [a.args[0], {
                        ctype: "number",
                        value: {
                            real: 1,
                            imag: 0
                        }
                    }],
                    I: a.args[0].I
                });
            else if ("function" === a.ctype && k.hasOwnProperty(a.oper)) {
                c = a.oper;
                oa = c.replace("$", "_");
                X(l, oa, !1);
                b[c] = oa;
                b = {};
                for (pa in k[c].arglist)
                    p = k[c].arglist[pa].name, q = oa + "_" + p, b[p] = q, X(l, q, !1), h[q].U.push(a.args[pa]);
                k[c].ta || (k[c].ta = !0, f(k[c].body, b, c, v), h[oa].U.push(k[c].body))
            }
        }
        var h = a.j,
            k = a.l,
            l = a;
        f(b, c, "global", !1)
    }
    function ec(a, b) {
        function c(a) {
            if (a.hasOwnProperty("dependsOnPixel"))
                return a.dependsOnPixel;
            if ("variable" === a.ctype) {
                var b = a.name;
                b = a.I[b] || b;
                return k[b] ? a.dependsOnPixel = !0 : a.dependsOnPixel = !1
            }
            b = "random randomint randominteger randombool randomnormal verbatimglsl".split(" ");
            if ("function" === a.ctype && -1 != b.indexOf(y(a.oper)))
                return a.dependsOnPixel = !0;
            if ("repeat$2" === a.oper || "forall$2" === a.oper || "apply$2" === a.oper)
                return c(a.args[1]) ? (k[a.args[1].I["#"]] = !0, a.dependsOnPixel = !0) : a.dependsOnPixel =
                !1;
            if ("repeat$3" === a.oper || "forall$3" === a.oper || "apply$3" === a.oper)
                return c(a.args[2]) ? (k[a.args[2].I[a.args[1].name]] = !0, a.args[1].dependsOnPixel = !0, a.dependsOnPixel = !0) : a.dependsOnPixel = !1;
            for (var e in a.args)
                if (c(a.args[e]))
                    return a.dependsOnPixel = !0;
            return "function" === a.ctype && h.hasOwnProperty(a.oper) && c(h[a.oper].body) ? a.dependsOnPixel = !0 : "field" === a.ctype ? a.dependsOnPixel = c(a.obj) : a.dependsOnPixel = !1
        }
        function e(a, b) {
            if (c(a)) {
                for (var f in a.args)
                    e(a.args[f], b || "repeat$2" === a.oper && 0 == f || "repeat$3" ===
                    a.oper && 0 == f || "_" === a.oper && 1 == f);
                "field" === a.ctype && e(a.obj, b);
                "function" === a.ctype && h.hasOwnProperty(a.oper) && (a = a.oper, q.hasOwnProperty(a) || (q[a] = !0, e(h[a].body, b)))
            } else if ("boolean" !== a.ctype && "number" !== a.ctype && "void" !== a.ctype) {
                ".." === a.oper && (b = !0);
                f = !1;
                var k;
                for (k in u)
                    if (!f && va(a, u[k].X)) {
                        f = !0;
                        var l = k
                    }
                f || (l = ya(), u[l] = {
                    X: a,
                    type: !1,
                    Z: b
                });
                u[l].Z = u[l].Z || b;
                a.isuniform = !0;
                a.uvariable = l
            }
        }
        var f = a.j,
            h = a.l,
            k = {
                cgl_pixel: !0,
                "cgl_pixel.x": !0,
                "cgl_pixel.y": !0
            },
            l;
        for (l in f)
            if (1 <= f[l].U.length || f[l].pa)
                k[l] =
                !0;
        c(b);
        var q = {
                "": !0
            },
            u = a.D;
        e(b, !1)
    }
    function fc(a, b) {
        if ("function" === b.ctype && !a.l.hasOwnProperty(b.oper) && null !== a.C.getMyfunction(b.oper)) {
            var c = b.oper;
            a.l[c] = ua(a.C.getMyfunction(c));
            fc(a, a.l[c].body)
        }
        for (var e in b.args)
            fc(a, b.args[e])
    }
    function gc(a, b) {
        function c(a) {
            var b = {},
                c;
            for (c in a)
                b[c] = a[c];
            return b
        }
        function e(a, b) {
            "repeat$2" === a.oper || "forall$2" === a.oper || "apply$2" === a.oper ? (b = c(b), b["#"] = !0) : "repeat$3" === a.oper || "forall$3" === a.oper || "apply$3" === a.oper ? (b = c(b), b[a.args[1].name] = !0) : "=" === a.oper && (b[a.args[0].name] = !0);
            for (var f in a.args)
                e(a.args[f], b);
            "field" === a.ctype && e(a.obj, b);
            "variable" === a.ctype && (a = a.name, b[a] || (h[a] = !0))
        }
        var f = {},
            h = {};
        e(b, {});
        X(a, "cgl_pixel", !1);
        a.j.cgl_pixel.w = z.F;
        if (1 == Object.keys(h).length)
            f[Object.keys(h)[0]] =
            "cgl_pixel";
        else if (h["#"])
            f["#"] = "cgl_pixel";
        else if (h.x && h.y)
            X(a, "cgl_pixel.x", !1), a.j["cgl_pixel.x"].w = z.f, f.x = "cgl_pixel.x", X(a, "cgl_pixel.y", !1), a.j["cgl_pixel.y"].w = z.f, f.y = "cgl_pixel.y";
        else {
            b = [];
            for (var k in h)
                a.C.nada == a.C.evaluateAndVal({
                    ctype: "variable",
                    name: k
                }) && b.push(k);
            1 == b.length ? f[b[0]] = "cgl_pixel" : h.p ? f.p = "cgl_pixel" : h.z && (f.z = "cgl_pixel")
        }
        "cgl_pixel" === f.z && (a.j.cgl_pixel.w = z.h);
        return f
    }
    function Z(a, b, c) {
        var e = Y(a, b);
        if (b.isuniform)
            return b = b.uvariable, c ? {
                code: "",
                o: "constant" === e.type ? lb(e.value, J(e)) : b
            } : {
                code: ""
            };
        if (";" === b.oper) {
            e = {
                o: ""
            };
            for (var f = "", h = b.args.length - 1, k = h; 0 <= k; k--)
                "void" === b.args[k].ctype && (h = k - 1);
            for (k = 0; k <= h; k++)
                e = Z(a, b.args[k], c && k === h), f += e.code;
            return c ? {
                code: f,
                o: e.o
            } : {
                code: f
            }
        }
        if ("constant" === e.type)
            return c ? {
                o: lb(e.value, J(e)),
                code: ""
            } : {
                code: ""
            };
        if ("=" === b.oper)
            return e = Z(a, b.args[1], !0), b = Z(a, b.args[0], !0).o + " = " + W(a, e.o, Y(a, b.args[1]), Y(a, b.args[0])),
            c ? {
                code: e.code,
                o: b
            } : {
                code: e.code + b + ";\n"
            };
        if ("repeat$2" === b.oper || "repeat$3" === b.oper) {
            f = Z(a, b.args[0], !0);
            if ("constant" !== Y(a, b.args[0]).type)
                return console.error("repeat possible only for fixed constant number in GLSL"), !1;
            e = "repeat$2" === b.oper ? b.args[1].I["#"] : b.args[2].I[b.args[1].name];
            f = Number(f.o);
            h = "";
            if ("constant" === a.j[e].w.type)
                for (k = 1; k <= f; k++) {
                    a.j[e].w = db(k);
                    a.T++;
                    var l = Z(a, b.args["repeat$2" === b.oper ? 1 : 2], k === f && c);
                    h += l.code;
                    if (k === f && c)
                        return {
                            code: h,
                            o: l.o
                        }
                }
            else if (k = "", l = Z(a, b.args["repeat$2" ===
            b.oper ? 1 : 2], c), b = Y(a, b.args["repeat$2" === b.oper ? 1 : 2]), c && (k = ya(), a.j[k] || (X(a, k, !0), a.j[k].w = b)), h = h + ("for(int " + e + "=1; " + e + " <= " + f + "; " + e + "++) {\n") + l.code, c && (h += k + " = " + l.o + ";\n"), h += "}\n", c)
                return {
                    code: h,
                    o: k
                };
            return {
                code: h
            }
        }
        if ("forall$2" === b.oper || "forall$3" === b.oper || "apply$2" === b.oper || "apply$3" === b.oper) {
            var q = Y(a, b.args[0]);
            if ("list" !== q.type && ("constant" !== q.type || "list" !== q.value.ctype))
                return console.error(b.oper + " only possible for lists"), !1;
            f = q.length || q.value.value.length;
            k = 2 === b.args.length ?
            b.args[1].I["#"] : b.args[2].I[b.args[1].name];
            var u = a.j[k].w,
                p = l = "";
            c && (p = ya(), l += R(e) + " " + p + ";\n");
            "list" === e.type && ob(e, a);
            if ("constant" === a.j[k].w.type || "constant" === q.type)
                for (q = a.C.evaluateAndVal(b.args[0]), u = 0; u < f; u++)
                    a.j[k].w = Za(q.value[u]), a.T++, h = Z(a, b.args[2 === b.args.length ? 1 : 2], c), l += h.code, "forall$2" === b.oper || "forall$3" === b.oper ? u + 1 === f && c && (l += p + " = " + h.o + ";\n") : c && (l += Q(e, u)([p], [], a) + " = " + h.o + ";\n");
            else {
                h = Z(a, b.args[2 === b.args.length ? 1 : 2], c);
                var v = Z(a, b.args[0], !0);
                l += v.code;
                var D =
                v.o;
                !a.j[D] && !a.D[D] && 2 <= q.length && (D = ya(), l += R(q) + " " + D + " = " + v.o + ";\n");
                a.j[k].global = !0;
                for (v = 0; v < f; v++)
                    l += k + " = " + Q(q, v)([D], [], a) + ";\n", l += h.code, c && ("forall$2" === b.oper || "forall$3" === b.oper ? v === f - 1 && (l += p + " = " + h.o + ";\n") : l += Q(e, v)([p], [], a) + " = " + h.o + ";\n");
                "list" === u.type && ob(u, a)
            }
            return c ? {
                code: l,
                o: p
            } : {
                code: l
            }
        }
        if ("if$2" === b.oper || "if$3" === b.oper) {
            l = Z(a, b.args[0], !0);
            f = Y(a, b.args[0]);
            k = h = "";
            p = Z(a, b.args[1], c);
            c && (k = ya(), a.j[k] || (X(a, k, !0), a.j[k].w = e));
            "constant" != f.type && (h += l.code, h += "if(" +
            l.o + ") {\n");
            if ("constant" != f.type || "constant" == f.type && f.value.value)
                h += p.code, c && (h += k + " = " + W(a, p.o, Y(a, b.args[1]), e) + ";\n");
            "if$3" === b.oper && (l = Z(a, b.args[2], c), "constant" != f.type && (h += "} else {\n"), "constant" != f.type || "constant" == f.type && !f.value.value) && (h += l.code, c && (h += k + " = " + W(a, l.o, Y(a, b.args[2]), e) + ";\n"));
            "constant" != f.type && (h += "}\n");
            return c ? {
                code: h,
                o: k
            } : {
                code: h
            }
        }
        if ("function" === b.ctype || "infix" === b.ctype) {
            l = b.oper;
            if ("verbatimglsl" === y(l))
                return b = a.C.evaluateAndVal(b.args[0]).value,
                c ? {
                    o: b,
                    code: ""
                } : {
                    code: b
                };
            e = b.args.map(function(b) {
                return Z(a, b, !0)
            });
            f = b.args.map(function(b) {
                return Y(a, b)
            });
            if (a.l.hasOwnProperty(l))
                for (k = hc(a, l), h = Array(e.length), p = 0; p < e.length; p++)
                    h[p] = a.j[a.l[l].body.I[a.l[l].arglist[p].name]].w;
            else {
                l = y(l);
                if ("regional" === l)
                    return c ? {
                        o: "",
                        code: ""
                    } : {
                        code: ""
                    };
                k = V[l](f);
                if (!k)
                    return console.error("Could not find an implementation for " + l + "(" + f.map(B).join(", ") + ").\nReturning empty code"), c ? {
                        o: "",
                        code: ""
                    } : {
                        code: ""
                    };
                h = k.s;
                k = k.m
            }
            l = "";
            p = Array(e.length);
            for (q = 0; q <
            e.length; q++)
                l += e[q].code, p[q] = W(a, e[q].o, f[q], h[q]);
            b = k(p, b.modifs, a);
            return c ? {
                o: b,
                code: l
            } : {
                code: l + b + ";\n"
            }
        }
        if ("variable" === b.ctype)
            return e = b.name, e = b.I[e] || e, c ? {
                o: e,
                code: ""
            } : {
                code: e + ";\n"
            };
        if ("void" === b.ctype)
            return c ? {
                o: "",
                code: ""
            } : {
                code: ""
            };
        if ("field" === b.ctype && (e = Y(a, b.obj), k = {
            x: 0,
            y: 1,
            z: 2,
            r: 0,
            g: 1,
            b: 2,
            a: 3
        }[b.key], f = !1, h = Z(a, b.obj, !0).o, void 0 != k && "list" === e.type ? f = Q(e, k)([h], null, a) : "xy" === b.key && "list" === e.type ? (2 === e.length && (f = h), 3 === e.length && (f = O("dehomogenize")([W(a, h, e, z.A)], null, a))) :
        e === z.A && (k = {
            xy: "dehomogenize",
            x: "dehomogenizex",
            y: "dehomogenizey"
        }, k[b.key] && (f = O(k[b.key])([W(a, h, e, z.A)], null, a))), f))
            return c ? {
                o: f,
                code: ""
            } : {
                code: f + ";\n"
            };
        console.error("dont know how to this.compile " + JSON.stringify(b))
    }
    function hc(a, b) {
        ic(a, b, a.l[b].arglist.length);
        return N(b.replace("$", "_"))
    }
    function ic(a, b, c) {
        if (!a.mark("compiledfunctions", b)) {
            for (var e = a.l[b], f = b.replace("$", "_"), h = e.body.I, k = Array(c), l = 0; l < c; l++)
                k[l] = e.arglist[l].name;
            c = a.j[f].w === z.W;
            var q = R(a.j[f].w) + " " + f + "(" + k.map(function(b) {
                return R(a.j[h[b]].w) + " " + h[b]
            }).join(", ") + "){\n";
            for (u in e.j)
                k = e.j[u], q += R(a.j[k].w) + " " + k + ";\n";
            var u = Z(a, e.body, !c);
            e = Y(a, e.body);
            q += u.code;
            c || (q += "return " + W(a, u.o, e, a.j[f].w) + ";\n");
            q += "}\n";
            a.add("compiledfunctions", b, function() {
                return q
            })
        }
    }
    function Ua(a, b) {
        xa = 0;
        var c = b = ua(b);
        fc(a, c);
        dc(a, c, gc(a, c));
        ec(a, c);
        for (var e in a.D) {
            c = a.C.evaluateAndVal(a.D[e].X);
            if (!c.ctype || "undefined" === c.ctype) {
                console.error("can not evaluate:");
                console.log(a.D[e].X);
                break
            }
            a.D[e].type = a.D[e].Z ? Za(c) : wa(c)
        }
        e = !0;
        for (var f in a.j)
            a.j[f].w = a.j[f].w || !1, a.j[f].Z && (a.j[f].w = db(1), a.T++);
        for (; e;) {
            e = !1;
            for (var h in a.j)
                if (!a.j[h].Z)
                    for (var k in a.j[h].U) {
                        f = J(Y(a, a.j[h].U[k]));
                        var l = c = a.j[h].w || !1;
                        f && (c ? F(f, c) ? l = c : l = A(c, f) : l = f, l && l !== c && (a.j[h].w = l, a.T++, e = !0))
                    }
        }
        for (var q in a.D)
            "list" ===
            a.D[q].type.type && ob(a.D[q].type, a);
        for (var u in a.j)
            "list" === a.j[u].w.type && ob(a.j[u].w, a);
        h = Z(a, b, !0);
        k = Y(a, b);
        b = W(a, h.o, k, z.color);
        F(k, z.color) || console.error("expression does not generate a color");
        k = bc(a, "structs");
        k += bc(a, "uniforms");
        q = [];
        for (var p in a.D)
            "constant" != a.D[p].type.type && a.D[p].type != z.image && q.push("uniform " + R(a.D[p].type) + " " + p + ";");
        k += q.join("\n");
        p = "";
        for (var v in a.O)
            p += a.O[v].code + "\n";
        k = k + p + bc(a, "includedfunctions");
        k += bc(a, "functions");
        for (var D in a.j)
            a.j[D].w && a.j[D].global &&
            (k += R(a.j[D].w) + " " + D + ";\n");
        k += bc(a, "compiledfunctions");
        k += "void main(void) {\n" + h.code + "gl_FragColor = " + b + ";\n}\n";
        console.log(k);
        v = {};
        if (a.i.compiledfunctions)
            for (var da in a.i.compiledfunctions.ja)
                v[da] = a.C.getMyfunction(da).generation;
        return {
            code: k,
            D: a.D,
            O: a.O,
            ia: v
        }
    }
    ;
    function jc(a, b, c, e) {
        this.X = b;
        this.C = e;
        this.l = c;
        kc(this);
        b = this.i;
        this.name = a;
        this.code = "uniform sampler2D _sampler" + a + ";\nuniform float _ratio" + a + ";\nuniform vec2 _cropfact" + a + ";\nvec4 _imagergba" + a + "(vec2 A, vec2 B, vec2 p) {\n  p -= A; B -= A;\n  float b = dot(B,B);\n  p = vec2(dot(p,B),_ratio" + a + "*dot(p,vec2(-B.y,B.x)))/b;\n  " + (b.repeat ? "p = mod(p, vec2(1.));" : "") + "\n  " + (b.repeat && b.N ? "vec4 color = vec4(0.);\n    float totalWeight = 0.;\n    for(int dx=0; dx<2; dx++) for(int dy=0; dy<2; dy++) {\n      vec2 delta = .5*vec2(dx, dy);\n      vec2 center = delta+vec2(.5);\n      vec2 tc = fract(p-delta)+delta;\n      float dst = dot(abs(tc-center),vec2(1.));\n      float w = max(.5-dst,0.);\n      w=w*w;\n      color += w * texture2D(_sampler" +
        a + ", tc*_cropfact" + a + ");\n      totalWeight += w;\n    }\n    return color/totalWeight;" : b.repeat ? "return texture2D(_sampler" + a + ", p*_cropfact" + a + ");" : "if(0. <= p.x && p.x <= 1. && 0. <= p.y && p.y <= 1.)\n          return texture2D(_sampler" + a + ", p*_cropfact" + a + ");\n       else\n          return vec4(0.);") + "\n  }"
    }
    function kc(a) {
        var b = a.l,
            c = a.C;
        b = {
            S: b.hasOwnProperty("interpolate") ? c.evaluateAndVal(b.interpolate).value : !0,
            N: b.hasOwnProperty("mipmap") ? c.evaluateAndVal(b.mipmap).value : !1,
            repeat: b.hasOwnProperty("repeat") ? c.evaluateAndVal(b.repeat).value : !1
        };
        !a.i || a.i.N == b.N && a.i.repeat == b.repeat || (console.log("enfore recompilation because texture modifiers changed."), ra++);
        a.i = b
    }
    function ab(a) {
        var b = a.C.evaluateAndVal(a.X).value,
            c = "string" === typeof b ? a.C.getImage(b, !0) : b;
        if (null == c)
            return console.error("Could not find image " + b + "."), t;
        kc(a);
        return Na(c, a.C, a.i)
    }
    function lc(a, b, c) {
        c.O.hasOwnProperty(a) || (c.O[a] = new jc(a, c.D[a].X, b, c.C));
        return a
    }
    function ac(a, b, c) {
        return ["_imagergba", lc(a[2], b, c), "(", a[0], ",", a[1], ",", a[3], ")"].join("")
    }
    function Zb(a, b, c) {
        return ["(_imagergba", lc(a[2], b, c), "(", a[0], ",", a[1], ",", a[3], ").rgb)"].join("")
    }
    function $b(a, b, c) {
        c.add("uniforms", "corners", function() {
            return "uniform vec2 _lowerleft, _lowerright;"
        });
        return ["_imagergba", lc(a[0], b, c), "(_lowerleft, _lowerright, ", a[1], ")"].join("")
    }
    function Yb(a, b, c) {
        c.add("uniforms", "corners", function() {
            return "uniform vec2 _lowerleft, _lowerright;"
        });
        return ["(_imagergba", lc(a[0], b, c), "(_lowerleft, _lowerright, ", a[1], ").rgb)"].join("")
    }
    ;
    function mc(a) {
        var b = void 0 === b ? null : b;
        return "list" !== a.ctype ? (console.log("argument is not a list"), b) : a.value
    }
    function cb(a) {
        var b = void 0 === b ? [.5, .5, .5] : b;
        if ("number" === a.ctype) {
            var c = nc(a);
            if (!isNaN(c))
                return [c, c, c]
        }
        a = mc(a);
        return null === a ? b : 3 != a.length ? (console.log("Not an RGB color vector"), b) : a.map(function(a) {
            return nc(a)
        })
    }
    function bb(a) {
        var b = void 0 === b ? Number.NaN : b;
        if ("number" !== a.ctype)
            return console.log("argument is not a number"), b;
        b = a.value;
        a = b.real;
        b = b.imag;
        0 !== b && console.log("complex number is not real");
        b = Math.round(a);
        b !== a && console.log("number is not an integer");
        return b
    }
    function nc(a) {
        var b = void 0 === b ? Number.NaN : b;
        b = void 0 === b ? Number.NaN : b;
        "number" !== a.ctype ? (console.log("argument is not a number"), a = b) : (a = a.value, b = a.real, 0 !== a.imag && console.log("complex number is not real"), a = b);
        return 0 > a ? 0 : 1 < a ? 1 : a
    }
    ;
    function ta(a) {
        this.message = a
    }
    ta.prototype.toString = function() {
        return this.message
    };
    function Qa(a, b) {
        var c = r;
        this.i = c.createProgram();
        c.i && (a = "#version 300 es\n" + a.replace(/attribute/g, "in").replace(/varying/g, "out"), b = "#version 300 es\n" + b.replace(/varying/g, "in").replace(/gl_FragColor/g, "FragColor").replace(/texture2D/g, "texture").replace(/precision highp float;/g, "precision highp float;\n#define webgl2 true\nout vec4 FragColor;"));
        this.Y = oc(this, c, c.VERTEX_SHADER, a);
        oc(this, c, c.FRAGMENT_SHADER, b);
        a = this.i;
        c.linkProgram(a);
        if (!c.getProgramParameter(a, c.LINK_STATUS))
            throw new ta("Error linking shader:\n" +
            c.getProgramInfoLog(a));
        c.validateProgram(a);
        if (!c.getProgramParameter(a, c.VALIDATE_STATUS))
            throw new ta("Error validating shader:\n" + c.getProgramInfoLog(a));
        var e = this.i,
            f,
            h,
            k = {},
            l;
        b = c.getProgramParameter(e, c.ACTIVE_UNIFORMS);
        for (a = 0; a < b; ++a) {
            var q = c.getActiveUniform(e, a);
            if (null !== q && (f = q.name.replace(/\]/g, ""))) {
                for (l = k; null !== (h = /[.\[]/.exec(f));) {
                    var u = f.substr(0, h.index);
                    l.hasOwnProperty(u) ? l = l[u] : "." === h[0] ? l = l[u] = {} : l = l[u] = [];
                    f = f.substr(h.index + 1)
                }
                if (1 < q.size) {
                    h = q.size;
                    var p = Array(h);
                    for (u =
                    0; u < h; ++u) {
                        var v = q.name + "[" + u + "]";
                        v = pc(this, c, v, q);
                        p[u] = v
                    }
                    l[f] = p
                } else
                    v = pc(this, c, q.name, q), l[f] = v
            }
        }
        this.l = k
    }
    function oc(a, b, c, e) {
        c = b.createShader(c);
        b.shaderSource(c, e);
        b.compileShader(c);
        if (!b.getShaderParameter(c, b.COMPILE_STATUS))
            throw console.warn(e.split("\n")), new ta("Error compiling shader:\n" + b.getShaderInfoLog(c));
        b.attachShader(a.i, c);
        return c
    }
    function pc(a, b, c, e) {
        a = b.getUniformLocation(a.i, c);
        switch (e.type) {
        case b.FLOAT:
            return b.uniform1fv.bind(b, a);
        case b.FLOAT_VEC2:
            return b.uniform2fv.bind(b, a);
        case b.FLOAT_VEC3:
            return b.uniform3fv.bind(b, a);
        case b.FLOAT_VEC4:
            return b.uniform4fv.bind(b, a);
        case b.BOOL:
        case b.INT:
        case b.SAMPLER_2D:
        case b.SAMPLER_CUBE:
            return b.uniform1iv.bind(b, a);
        case b.BOOL_VEC2:
        case b.INT_VEC2:
            return b.uniform2iv.bind(b, a);
        case b.BOOL_VEC3:
        case b.INT_VEC3:
            return b.uniform3iv.bind(b, a);
        case b.BOOL_VEC4:
        case b.INT_VEC4:
            return b.uniform4iv.bind(b,
            a);
        case b.FLOAT_MAT2:
            return b.uniformMatrix2fv.bind(b, a, !1);
        case b.FLOAT_MAT3:
            return b.uniformMatrix3fv.bind(b, a, !1);
        case b.FLOAT_MAT4:
            return b.uniformMatrix4fv.bind(b, a, !1);
        default:
            throw new ta("Unknown data type for uniform " + c);
        }
    }
    ;
}).call(this); //# sourceMappingURL=CindyGL.js.map
