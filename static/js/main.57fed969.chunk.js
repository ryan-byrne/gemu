(this["webpackJsonpgemu-page"]=this["webpackJsonpgemu-page"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n(1),o=n.n(i),r=n(7),c=n.n(r),s=(n(13),n(2)),u=n(3),h=n(5),l=n(4),d=(n(14),n(15),function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(){var e;return Object(s.a)(this,n),(e=t.call(this)).state={index:0},e}return Object(u.a)(n,[{key:"changeMenu",value:function(e){e==this.state.index?this.setState({index:0}):this.setState({index:e})}},{key:"render",value:function(){var e=this,t=[Object(a.jsx)("div",{}),Object(a.jsx)(b,{}),Object(a.jsx)(v,{})];return Object(a.jsxs)("div",{className:"menuContainer",children:[Object(a.jsxs)("div",{className:"mainMenu",children:[Object(a.jsx)(j,{name:"Join a Gemu",onClick:function(t){return e.changeMenu(1)}}),Object(a.jsx)(j,{name:"Start a Gemu",onClick:function(t){return e.changeMenu(2)}})]}),Object(a.jsx)("div",{className:"subMenu",children:t[this.state.index]})]})}}]),n}(o.a.Component)),j=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(){var e;return Object(s.a)(this,n),(e=t.call(this)).state={hover:!1,selected:!1},e}return Object(u.a)(n,[{key:"changeHover",value:function(){this.state.selected||this.setState({hover:!this.state.hover})}},{key:"render",value:function(){var e=this.state.hover?"hoveredMenuItem":"normalMenuItem";this.state.selected;return Object(a.jsx)("div",{className:e,onMouseEnter:this.changeHover.bind(this),onMouseLeave:this.changeHover.bind(this),onClick:this.props.onClick,style:{padding:"20px",cursor:"pointer",borderRadius:"10px"},children:this.props.name})}}]),n}(o.a.Component),b=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(){var e;return Object(s.a)(this,n),(e=t.call(this)).state={roomCode:"ROOM CODE",textColor:"#d1d1d1",letterSpacing:"1px"},e}return Object(u.a)(n,[{key:"inputSelect",value:function(){this.setState({roomCode:""})}},{key:"roomInput",value:function(e){var t=e.nativeEvent.inputType;if("insertText"===t){var n=this.state.roomCode+e.nativeEvent.data;this.setState({roomCode:n}),console.log(n)}console.log(t)}},{key:"roomOut",value:function(){this.setState({roomCode:"ROOM CODE",textColor:"#d1d1d1",letterSpacing:"1px"})}},{key:"render",value:function(){return Object(a.jsx)("div",{children:Object(a.jsx)("form",{children:Object(a.jsx)("label",{children:Object(a.jsx)("input",{onBlur:this.roomOut.bind(this),value:this.state.roomCode,onChange:this.roomInput.bind(this),autoComplete:"off",onClick:this.inputSelect.bind(this),className:"roomCode",type:"text",maxLength:"6",style:{color:this.state.textColor}})})})})}}]),n}(o.a.Component),v=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(){return Object(s.a)(this,n),t.call(this)}return Object(u.a)(n,[{key:"render",value:function(){return Object(a.jsx)("div",{children:"StartMenu"})}}]),n}(o.a.Component),O=d,m=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(){var e;return Object(s.a)(this,n),(e=t.call(this)).state={index:0},e}return Object(u.a)(n,[{key:"render",value:function(){return Object(a.jsx)(O,{})}}]),n}(o.a.Component),f=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,o=t.getLCP,r=t.getTTFB;n(e),a(e),i(e),o(e),r(e)}))};c.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(m,{})}),document.getElementById("root")),f()}},[[16,1,2]]]);
//# sourceMappingURL=main.57fed969.chunk.js.map