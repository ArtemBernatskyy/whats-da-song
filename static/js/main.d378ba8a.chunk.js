(this.webpackJsonpsrc=this.webpackJsonpsrc||[]).push([[0],{32:function(e,t,a){e.exports=a(69)},37:function(e,t,a){},55:function(e,t,a){},68:function(e,t,a){},69:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),i=a(5),r=a.n(i),c=(a(37),a(2)),o=a.n(c),l=a(7),u=a(8),d=a(11),h=a(9),m=a(12),p=a(13),g=(a(17),a(4)),v=a.n(g),f=a(10),w=a.n(f),k=(a(55),a(30)),E=a(15),N=a(31),b=a.n(N),y=(a(68),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).toggleModal=function(){a.setState({isModalOpen:!a.state.isModalOpen})},a.state={isModalOpen:!1,song:null},a.emitChangeDebounced=b()(a.emitChange,400),a}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){this.emitChangeDebounced.cancel()}},{key:"emitChange",value:function(e){var t,a;return o.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return e||this.setState({song:null}),n.prev=2,n.next=5,o.a.awrap(w.a.get("https://dude-what-is-the-song.herokuapp.com/song/searchByLyrics?l=".concat(e)));case 5:200===(t=n.sent).status&&(a=t.data.appleMusicLink.split("http://www.youtube.com/watch?v=")[1],t.data.appleMusicLink="https://www.youtube.com/embed/".concat(a,"?autoplay=1&mute=1"),this.setState({song:t.data})),n.next=11;break;case 9:n.prev=9,n.t0=n.catch(2);case 11:case 12:case"end":return n.stop()}}),null,this,[[2,9]])}},{key:"render",value:function(){var e=this,t=this.state,a=t.isModalOpen,n=t.song;return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"modal-window ".concat(a?"modal-window--visible":"")},s.a.createElement("div",null,s.a.createElement("input",{onChange:function(t){return e.emitChangeDebounced(t.target.value)},placeholder:"Search by lyrics"}),n&&s.a.createElement("div",{className:"television"},s.a.createElement("div",{className:"television__center"},s.a.createElement("div",{className:"television__screen"},s.a.createElement("iframe",{src:n.appleMusicLink,frameBorder:"0",allowFullScreen:!0})),s.a.createElement("div",{className:"television__channels-wrapper"},s.a.createElement("ul",{className:"television__channels"},s.a.createElement("li",{className:"television__channel"},s.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.linkedin.com/in/artembernatskyy/",title:"Channel 1"})),s.a.createElement("li",{className:"television__channel"},s.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.linkedin.com/in/michael-rudyy/",title:"Channel 2"})),s.a.createElement("li",{className:"television__channel"},s.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"hhttps://www.linkedin.com/in/ikasyk/",title:"Channel 3"})))))))),s.a.createElement("div",{className:"lyrics-search ".concat(a?"lyrics-search--opened":""),onClick:this.toggleModal},s.a.createElement(k.a,{icon:a?E.b:E.a})))}}]),t}(s.a.Component)),R={DENIED:"denied",PROMPT:"prompt",GRANTED:"granted",UNKNOWN:"unknown"},x=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).showNotification=function(e,t){p.b.dismiss(),p.b[e](t,{hideProgressBar:!0})},a.toggleRecording=function(){return o.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:a.state.isRecording?a.stopRecording():(a.chunks=[],a.mediaRecorder.start(10),setTimeout((function(){"recording"===a.mediaRecorder.state&&a.stopRecording()}),1e4),a.setState({isAnimating:!0,isRecording:!0}));case 2:case"end":return e.stop()}}))},a.state={isAnimating:!1,permissionsStatus:R.UNKNOWN,isRecording:!1},a.mediaRecorder=null,a.chunks=[],a}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){return o.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.awrap(this.checkPermissions());case 2:this.state.permissionsStatus===R.GRANTED&&this.initMediaRecorder();case 3:case"end":return e.stop()}}),null,this)}},{key:"initMediaRecorder",value:function(){var e,t=this;return o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,o.a.awrap(navigator.mediaDevices.getUserMedia({audio:!0,video:!1}));case 2:e=a.sent,this.mediaRecorder=new MediaRecorder(e),this.mediaRecorder.ondataavailable=function(e){e.data&&e.data.size>0&&t.chunks.push(e.data)};case 5:case"end":return a.stop()}}),null,this)}},{key:"checkPermissions",value:function(){var e;return o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.awrap(navigator.permissions.query({name:"microphone"}));case 2:if((e=t.sent).state!==R.GRANTED){t.next=8;break}this.showNotification("info","Audio permissions granted"),this.setState({permissionsStatus:R.GRANTED}),t.next=26;break;case 8:if(e.state!==R.PROMPT){t.next=25;break}return this.showNotification("info","Plz allow audio permissions"),this.setState({permissionsStatus:R.PROMPT}),t.prev=11,t.next=14,o.a.awrap(navigator.mediaDevices.getUserMedia({audio:!0,video:!1}));case 14:t.sent.getTracks().forEach((function(e){return e.stop()})),this.showNotification("success","Audio permissions granted"),this.setState({permissionsStatus:R.GRANTED}),t.next=23;break;case 20:t.prev=20,t.t0=t.catch(11),t.t0.message&&"Permission denied"===t.t0.message&&(this.showNotification("error","Audio permissions denied"),this.setState({permissionsStatus:R.DENIED}));case 23:t.next=26;break;case 25:e.state===R.DENIED&&(this.showNotification("error","Audio permissions denied"),this.setState({permissionsStatus:R.DENIED}));case 26:case"end":return t.stop()}}),null,this,[[11,20]])}},{key:"stopRecording",value:function(){return o.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return this.mediaRecorder.stop(),e.next=3,o.a.awrap(this.sendAudio());case 3:this.setState({isAnimating:!1,isRecording:!1});case 4:case"end":return e.stop()}}),null,this)}},{key:"sendAudio",value:function(){var e,t,a,n;return o.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return e=new Blob(this.chunks,{type:"audio/webm"}),(t=new FormData).append("file",e,"recording.webm"),a={headers:{"content-type":"multipart/form-data"}},s.prev=4,s.next=7,o.a.awrap(w.a.post("https://dude-what-is-the-song.herokuapp.com/song/searchByFile",t,a));case 7:200===(n=s.sent).status?this.showNotification("success","".concat(n.data.artist," - ").concat(n.data.title)):this.showNotification("warning","Can't find any matching song"),s.next=14;break;case 11:s.prev=11,s.t0=s.catch(4),this.showNotification("warning","Can't find any matching song");case 14:case"end":return s.stop()}}),null,this,[[4,11]])}},{key:"render",value:function(){var e=this.state,t=e.isAnimating,a=e.permissionsStatus,n=v()({logo:!0,"logo--animate":t,"logo--disabled":a!==R.GRANTED});return s.a.createElement("div",null,s.a.createElement("div",{className:"shazam-container"},s.a.createElement("div",{onClick:this.toggleRecording,className:n},s.a.createElement("div",{className:"c-shape"}),s.a.createElement("div",{className:"c-shape reverse"})),s.a.createElement("div",{className:"outer-circle ".concat(this.state.isAnimating?"outer-circle--animate":"")}),s.a.createElement("div",{className:"outer-circle2 ".concat(this.state.isAnimating?"outer-circle2--animate":"")})),!t&&s.a.createElement(y,null),s.a.createElement(p.a,null))}}]),t}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[32,1,2]]]);
//# sourceMappingURL=main.d378ba8a.chunk.js.map