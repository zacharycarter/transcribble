/**
 * transcribble 1.0.0 built on 2015-07-05.
 * Copyright (c) 2015 Zachary Carter <zacharycarter@pathfinderstudios.net>
 *
 * http://www.transcribble.io  http://github.com/zacharycarter/transcribble
 */

if("undefined"==typeof transcribble&&(transcribble=function(){}),transcribble.L=function(a,b){if(b){var c=Array.prototype.slice.call(b).join(" ");window.console.log(a+": "+c)}},transcribble.RuntimeError=function(a,b){this.code=a,this.message=b},transcribble.RuntimeError.prototype.toString=function(){return"RuntimeError: "+this.message},transcribble.RERR=transcribble.RuntimeError,"function"==typeof require)try{module.exports=transcribble}catch(e){}else"function"==typeof define&&define.amd?define("transcribble",[],function(){return transcribble}):(this||window).transcribble=transcribble;$(function(){function a(){return new Vex.Flow.Voice({num_beats:4,beat_value:4,resolution:Vex.Flow.RESOLUTION})}var b=$("#score")[0],c=new Vex.Flow.Renderer(b,Vex.Flow.Renderer.Backends.CANVAS),d=c.getContext(),e=new Vex.Flow.Stave(0,0,500);e.addClef("treble"),e.setContext(d).draw();var f=[new Vex.Flow.StaveNote({keys:["e/5"],duration:"q"}),new Vex.Flow.StaveNote({keys:["d/5"],duration:"h"}),new Vex.Flow.StaveNote({keys:["c/5","e/5","g/5"],duration:"q"})],g=[new Vex.Flow.StaveNote({keys:["c/4"],duration:"w"})],h=a().addTickables(f),i=a().addTickables(g);(new Vex.Flow.Formatter).joinVoices([h,i]).format([h,i],500);h.draw(d,e),i.draw(d,e)});
//# sourceMappingURL=transcribble-min.js.map