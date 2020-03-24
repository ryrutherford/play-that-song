(this["webpackJsonpplay-that-song"]=this["webpackJsonpplay-that-song"]||[]).push([[0],{371:function(e,t,a){"use strict";(function(e){var n=a(25),s=a(27),r=a(28),c=a(30),i=a(29),o=a(31),l=a(0),u=a.n(l),m=a(372),E=a.n(m),d=a(61),h=a(18),p=a(48),f=a(13),g=a(32),b=function(t){function l(){var t,r;Object(s.a)(this,l);for(var o=arguments.length,u=new Array(o),m=0;m<o;m++)u[m]=arguments[m];return(r=Object(c.a)(this,(t=Object(i.a)(l)).call.apply(t,[this].concat(u)))).state={songs:[]},r.isValidURL=function(){var e=r.props,t=e.songRequestSessions,a=e.sessionID,n=!1;if(Object(f.isLoaded)(t)){for(var s in t)if(t[s].session.sessionID===parseInt(a)){n=!0;break}return!!n}return!1},r.handleChange=function(t){r.setState(Object(n.a)({},t.target.id,t.target.value));var s=a(537),c={url:"https://accounts.spotify.com/api/token",headers:{Authorization:"Basic "+new e("966d6d530df44139850050457e8d19c4:e86cda917d614340b22952753b9118aa").toString("base64")},form:{grant_type:"client_credentials"},json:!0};t.target.value&&s.post(c,(function(e,t,a){if(!e&&200===t.statusCode){var n=a.access_token,c={url:"https://api.spotify.com/v1/search?limit=5&q="+encodeURIComponent(r.state.query)+"&type=track",headers:{Authorization:"Bearer "+n},json:!0};s.get(c,(function(e,t,a){r.setState({songs:a.tracks.items})}))}}))},r.handleClick=function(e){var t=r.props,a=t.requestSong,n=t.deleteNotifications,s=t.sessionID;e.preventDefault();var c=e.target.parentNode.parentNode.parentNode.id;document.getElementById("query").value="",a({songs:r.state.songs.filter((function(e){return e.id===c}))},r.props.history,s),n(),r.setState({songs:[]})},r}return Object(o.a)(l,t),Object(r.a)(l,[{key:"render",value:function(){var e=this,t=this.props,a=t.auth,n=t.reqError,s=t.songRequestSessions;if(!a.uid)return u.a.createElement(p.a,{to:"/signin"});if(Object(f.isLoaded)(s)&&!1===this.isValidURL())return u.a.createElement(p.a,{to:"/sessions"});var r=this.state.songs,c=r.length?r.map((function(t){return u.a.createElement("div",{className:"create-requests card",id:t.id,key:t.id},u.a.createElement("div",{className:"song-with-album"},u.a.createElement("img",{src:t.album.images[0].url,alt:"Album Cover"})),u.a.createElement("div",{className:"spotify"},u.a.createElement("img",{src:E.a,alt:"Spotify Logo"})),u.a.createElement("div",{className:"card-content"},u.a.createElement("span",{className:"card-title green-text"},t.name),u.a.createElement("p",{className:"black-text"},"Song \u2022 "+t.artists.map((function(e){return e.name})).join(", ")),u.a.createElement("p",{className:"green-text"},u.a.createElement("a",{target:"_blank",rel:"noreferrer noopener",title:"Play on Spotify",href:t.external_urls.spotify},"Play On Spotify")),u.a.createElement("div",{className:"input-field"},u.a.createElement("button",{onClick:e.handleClick,className:"btn green lighten-1 z-depth-0"},"Request Song"))))})):null;return u.a.createElement("div",{className:"container"},u.a.createElement("form",{className:"white"},u.a.createElement("h5",{className:"black-text text-darken-3"},"Search Songs"),u.a.createElement("div",{className:"input-field green-text"},u.a.createElement("input",{type:"text",id:"query",onChange:this.handleChange,placeholder:"Search by song name to display results"})),c),n?u.a.createElement("div",{className:"msg-container"},u.a.createElement("div",{className:"msg msg-error z-depth-3 scale-transition center"},u.a.createElement("p",null,n),u.a.createElement("button",{onClick:this.props.clearError,className:"btn white red-text lighten-1 z-depth-0"},"OK"))):null)}}]),l}(l.Component);t.a=Object(g.d)(Object(h.b)((function(e,t){var a=t.match.params.session_id;return{auth:e.firebase.auth,reqError:e.song.reqError,songRequestSessions:e.firestore.data.songRequestSessions,sessionID:a}}),(function(e){return{requestSong:function(t,a,n){e(Object(d.d)(t,a,n))},clearError:function(){e(Object(d.a)())},deleteNotifications:function(){e(Object(d.c)())}}})),Object(f.firestoreConnect)([{collection:"songRequestSessions"}]))(b)}).call(this,a(5).Buffer)},372:function(e,t,a){e.exports=a.p+"static/media/spotify.a162f1ee.png"},376:function(e,t,a){e.exports=a(781)},381:function(e,t,a){},551:function(e,t){},553:function(e,t){},583:function(e,t){},584:function(e,t){},61:function(e,t,a){"use strict";a.d(t,"d",(function(){return s})),a.d(t,"a",(function(){return r})),a.d(t,"c",(function(){return c})),a.d(t,"e",(function(){return i})),a.d(t,"b",(function(){return o}));var n=a(226),s=function(e,t,a){return function(s,r,c){c.getFirebase;var i=(0,c.getFirestore)(),o=e.songs[0],l=0,u=null,m=r().firebase.auth.uid,E=[],d=!1,h=null,p=null;i.collection("songRequestSessions").where("session.sessionID","==",parseInt(a)).get().then((function(e){e.forEach((function(e){var t=e.data().session;u=e.id,(p=t.songRequests).forEach((function(e,t){e.songID===o.id&&(h=t,l=e.numRequests+1,(E=e.requestors).includes(m)&&(d=!0))}))}))})).then((function(){if(0===l)l=1,p.push({title:o.name,artists:o.artists.map((function(e){return e.name})),externalURL:o.external_urls.spotify,songID:o.id,requestors:[].concat(Object(n.a)(E),[m]),albumIMGURL:o.album.images[0].url,numRequests:l}),i.collection("songRequestSessions").doc(u).update({"session.songRequests":p}).then((function(){t.push("/activeSession/"+a),s({type:"CREATE_SONG_REQUEST",songs:e})})).catch((function(e){s({type:"CREATE_SONG_REQUEST_ERROR",error:e})}));else if(!1===d)p[h].numRequests=l,p[h].requestors=[].concat(Object(n.a)(E),[m]),i.collection("songRequestSessions").doc(u).update({"session.songRequests":p}).then((function(){t.push("/activeSession/"+a),s({type:"UPDATE_SONG_REQUEST",songs:e})})).catch((function(e){s({type:"UPDATE_SONG_REQUEST_ERROR",error:e})}));else{s({type:"ALREADY_REQUESTED",err:"You have already requested this song."})}})).catch((function(e){s({type:"SONG_REQUEST_ERROR",error:e})})).catch((function(e){s({type:"GET_DOCUMENT_ERROR",error:e})}))}},r=function(){return function(e,t){e({type:"CLEAR_ERROR"})}},c=function(){return function(e,t,a){var n=(0,a.getFirestore)();n.collection("notifications").orderBy("time").get().then((function(t){var a=t.size,s=0;a>=500&&t.forEach((function(t){s<a-5&&(n.collection("notifications").doc(t.id).delete().then((function(){e({type:"DELETE_NOTIF"})})).catch((function(t){e({type:"DELETE_NOTIF_ERROR",error:t})})),s++)})),0!==s&&e({type:"DELETE_NOTIF"})})).catch((function(t){e({type:"DELETE_NOTIF_ERROR",error:t})}))}},i=function(e,t,a){return function(n,s,r){var c=(0,r.getFirestore)(),i=0,o=null,l=[],u=null,m=null;c.collection("songRequestSessions").where("session.sessionID","==",parseInt(a)).get().then((function(t){t.forEach((function(t){var a=t.data().session;o=t.id,(m=a.songRequests).forEach((function(t,a){t.songID===e&&(u=a,i=t.numRequests,l=t.requestors)}))}))})).then((function(){1===i?(m.splice(u,1),c.collection("songRequestSessions").doc(o).update({"session.songRequests":m}).then((function(){n({type:"UNDO_SONG_REQUEST"})})).catch((function(e){n({type:"UNDO_SONG_REQUEST_ERROR",error:e})}))):(m[u].numRequests=i-1,m[u].requestors=l.filter((function(e){return e!==t})),c.collection("songRequestSessions").doc(o).update({"session.songRequests":m}).then((function(){n({type:"UNDO_SONG_REQUEST"})})).catch((function(e){n({type:"UNDO_SONG_REQUEST_ERROR",error:e})})))})).catch((function(e){n({type:"UNDO_SONG_REQUEST_ERROR",error:e})})).catch((function(e){n({type:"GET_DOCUMENT_ERROR",error:e})}))}},o=function(e,t,a){return function(n,s,r){r.getFirebase;var c=(0,r.getFirestore)(),i=0,o=null,l=null,u=null;c.collection("songRequestSessions").where("session.sessionID","==",parseInt(a)).get().then((function(t){t.forEach((function(t){var a=t.data().session;o=t.id,(u=a.songRequests).forEach((function(t,a){t.songID===e&&(l=a,i=t.numRequests)}))}))})).then((function(){u[l].numRequests=i+1,u[l].requestors.push(t),c.collection("songRequestSessions").doc(o).update({"session.songRequests":u}).then((function(){n({type:"CREATE_SONG_REQUEST"})})).catch((function(e){n({type:"CREATE_SONG_REQUEST_ERROR",error:e})}))})).catch((function(e){n({type:"CREATE_SONG_REQUEST_ERROR",error:e})})).catch((function(e){n({type:"GET_DOCUMENT_ERROR",error:e})}))}}},629:function(e,t){},631:function(e,t){},654:function(e,t){},781:function(e,t,a){"use strict";a.r(t);var n=a(25),s=a(0),r=a.n(s),c=a(148),i=a.n(c),o=(a(381),a(27)),l=a(28),u=a(30),m=a(29),E=a(31),d=a(17),h=a(48),p=a(18),f=Object(p.b)(null,(function(e){return{signOut:function(){return e((function(e,t,a){(0,a.getFirebase)().auth().signOut().then((function(){e({type:"SIGNOUT_SUCCESS"})})).catch((function(t){e({type:"SIGNOUT_ERROR"})}))}))}}}))((function(e){return r.a.createElement("ul",{className:"right"},r.a.createElement("li",null,r.a.createElement(d.c,{to:"/about"},"About")),r.a.createElement("li",null,r.a.createElement(d.c,{to:"/sessions"},"Sessions")),r.a.createElement("li",null,r.a.createElement(d.c,{to:"/newSR"},"New Song Request")),r.a.createElement("li",null,r.a.createElement("a",{onClick:e.signOut},"Sign Out")),r.a.createElement("li",null,r.a.createElement(d.c,{to:"/",className:"btn btn-floating grey lighten-1"},e.profile.initials)))})),g=function(){return r.a.createElement("ul",{className:"right"},r.a.createElement("li",null,r.a.createElement(d.c,{to:"/about"},"About")),r.a.createElement("li",null,r.a.createElement(d.c,{to:"/signin"},"Sign In")),r.a.createElement("li",null,r.a.createElement(d.c,{to:"/signup"},"Sign Up")))},b=Object(p.b)((function(e){return{auth:e.firebase.auth,profile:e.firebase.profile}}))((function(e){var t=e.auth,a=e.profile,n=t.uid?r.a.createElement(f,{profile:a}):r.a.createElement(g,null);return r.a.createElement("nav",{className:"nav-wrapper green ligthen-1"},r.a.createElement("div",{className:"container"},r.a.createElement(d.b,{to:"/",className:"brand-logo"},"Play That Song"),n))})),R=function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-content break-line"},r.a.createElement("p",{className:"card-title green-text"},r.a.createElement("b",null,"What is ",r.a.createElement("i",null,"Play That Song"),"?")),r.a.createElement("p",{className:"black-text"},r.a.createElement("i",null,"Play That Song"),' is a website that allows users to create "Song Request Sessions" where they can share a unique code that allows other users to add song requests to the session.'))),r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-content about"},r.a.createElement("p",{className:"card-title green-text"},r.a.createElement("b",null,"How does it work?")),r.a.createElement("p",{className:"black-text"},"Song requests are made by using the built in search functionality, integrated with the Spotify API to return live search results.",r.a.createElement("br",null),r.a.createElement("br",null),"You must ",r.a.createElement("u",null,r.a.createElement("b",null,r.a.createElement(d.b,{to:"/signup",className:"green-text"},"create an account")))," before you can use the app."))),r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-content about"},r.a.createElement("p",{className:"card-title green-text"},r.a.createElement("b",null,"What can I do with it?")),r.a.createElement("p",{className:"black-text"},"Users are allowed to request the same song at most once and can undo requests once they've requested a song."))),r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-content about"},r.a.createElement("p",{className:"card-title green-text"},r.a.createElement("b",null,"How was this made?")),r.a.createElement("p",{className:"black-text"},"The code for this project can be found on ",r.a.createElement("b",null,r.a.createElement("u",null,r.a.createElement("a",{href:"https://github.com/ryrutherford/play-that-song",className:"green-text"},"Github"))),".",r.a.createElement("br",null),r.a.createElement("br",null),"The website was built using ",r.a.createElement("b",null,"ReactJS")," with ",r.a.createElement("b",null,"Redux")," as the central state manager, ",r.a.createElement("b",null,"Firebase")," as the host, authentication manager, and cloud function manager, and ",r.a.createElement("b",null,"Firestore")," as the database."))))},S=function(e){var t=e.match.params.id;return r.a.createElement("div",{className:"container section sr-details"},r.a.createElement("div",{className:"card z-depth-0"},r.a.createElement("div",{className:"card-content"},r.a.createElement("span",{className:"card-title"},"Song Title - ",t),r.a.createElement("p",null,"Artist")),r.a.createElement("div",{className:"card-action green-text lighten-4"},r.a.createElement("div",null,"Ext Info"),r.a.createElement("div",null,"Ext Info2"))))},N=function(e){function t(){var e,a;Object(o.a)(this,t);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:""},a.handleChange=function(e){a.setState(Object(n.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),a.props.signIn(a.state)},a}return Object(E.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.authError;return e.auth.uid?r.a.createElement(h.a,{to:"/"}):r.a.createElement("div",{className:"container"},r.a.createElement("form",{onSubmit:this.handleSubmit,className:"white"},r.a.createElement("h5",{className:"black-text text-darken-3"},"Sign In"),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"email",className:"green-text"},"Email"),r.a.createElement("input",{type:"email",id:"email",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"password",className:"green-text"},"Password"),r.a.createElement("input",{type:"password",id:"password",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("button",{className:"btn green lighten-1 z-depth-0"},"Sign In"),r.a.createElement("div",{className:"red-text center"},t?r.a.createElement("p",null,t):null))))}}]),t}(s.Component),v=Object(p.b)((function(e){return{authError:e.auth.authError,auth:e.firebase.auth}}),(function(e){return{signIn:function(t){return e(function(e){return function(t,a,n){(0,n.getFirebase)().auth().signInWithEmailAndPassword(e.email,e.password).then((function(){t({type:"SIGNIN_SUCCESS"})})).catch((function(e){t({type:"SIGNIN_ERROR",err:e})}))}}(t))}}}))(N),O=function(e){function t(){var e,a;Object(o.a)(this,t);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",firstName:"",lastName:""},a.handleChange=function(e){a.setState(Object(n.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),a.props.signUp(a.state)},a}return Object(E.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.auth,a=e.authError;return t.uid?r.a.createElement(h.a,{to:"/"}):r.a.createElement("div",{className:"container"},r.a.createElement("form",{onSubmit:this.handleSubmit,className:"white"},r.a.createElement("h5",{className:"black-text text-darken-3"},"Sign Up"),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"email",className:"green-text"},"Email"),r.a.createElement("input",{type:"email",id:"email",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"password",className:"green-text"},"Password"),r.a.createElement("input",{type:"password",id:"password",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"firstName",className:"green-text"},"First Name"),r.a.createElement("input",{type:"text",id:"firstName",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"lastName",className:"green-text"},"Last Name"),r.a.createElement("input",{type:"text",id:"lastName",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("button",{className:"btn green lighten-1 z-depth-0"},"Sign Up"),r.a.createElement("div",{className:"red-text center"},a?r.a.createElement("p",null,a):null))))}}]),t}(s.Component),y=Object(p.b)((function(e){return{auth:e.firebase.auth,authError:e.auth.authError}}),(function(e){return{signUp:function(t){return e(function(e){return function(t,a,n){var s=n.getFirebase,r=n.getFirestore,c=s(),i=r();c.auth().createUserWithEmailAndPassword(e.email,e.password).then((function(a){return i.collection("users").doc(a.user.uid).set({firstName:e.firstName,lastName:e.lastName,initials:e.firstName[0]+e.lastName[0]}).then((function(){t({type:"SIGNUP_SUCCESS"})})).catch((function(e){t({type:"SIGNUP_ERROR",err:e})}))})).catch((function(e){t({type:"SIGNUP_ERROR",err:e})}))}}(t))}}}))(O),_=a(371),j=a(13),I=a(32),q=a(373),D=a.n(q),C=function(e){var t=e.notifications;return r.a.createElement("div",{className:"section"},r.a.createElement("h3",{className:"green-text"},"Notifications"),r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-content"},r.a.createElement("ul",null,t&&t.map((function(e){return r.a.createElement("li",{key:e.id},r.a.createElement("span",{className:"green-text notifications"},r.a.createElement("b",null,e.title+" \u2022 "+e.artists.replace(",",", "))," was requested "+D()(e.time.toDate()).fromNow()),r.a.createElement("hr",null))}))),r.a.createElement("span",{className:"black-text notifications"},r.a.createElement("i",null,t!==[]?null:"No new notifications")))))},w=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={joinSessionError:null,path:null},a.getSessions=function(){var e=a.props,t=e.songRequestSessions,n=e.auth,s=[];if(Object(j.isLoaded)(t)){for(var r in t)null!==t[r]&&t[r].creatorID===n.uid&&s.push(t[r].session);return s}},a.joinSession=function(e){var t=a.props.songRequestSessions;e.preventDefault();var n=e.target.elements[0].value;if(Object(j.isLoaded)(t)){var s=!1;for(var r in t)if(t[r].session.sessionID===parseInt(n,10)){s=!0;break}if(s){var c="/activeSession/"+n;a.setState({path:c})}else a.setState({joinSessionError:"The code you entered did not match an active session. Please try again"})}},a.newSession=function(){var e=a.props,t=e.songRequestSessions,n=e.createSession;if(Object(j.isLoaded)(t)){var s=Math.floor(1e5+9e5*Math.random()),r=!1;for(var c in t)if(t[c].session.sessionID===s){r=!0;break}for(;r;)for(var i in s=Math.floor(1e5+9e5*Math.random()),t)r=t[i].session.sessionID===s;n(a.props.auth.uid,s)}},a.deleteSession=function(e){e.preventDefault();var t=e.target.id;a.props.deleteSession(t)},a}return Object(E.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.auth,n=t.notifications;return a.uid?this.state.path?r.a.createElement(h.a,{to:this.state.path}):r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12 m6"},r.a.createElement("div",{className:"section"},r.a.createElement("h3",{className:"green-text"},"Sessions"),r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-content"},r.a.createElement("div",{className:"session center"},r.a.createElement("button",{onClick:this.newSession,className:"btn green lighten-1 z-depth-0 "},"New Session"),r.a.createElement("br",null),r.a.createElement("form",{onSubmit:this.joinSession,className:"white"},r.a.createElement("div",{className:"input-field green-text"},r.a.createElement("input",{type:"number",id:"sessionID",placeholder:"Enter Session ID (6 digit code)"}),r.a.createElement("button",{className:"btn green lighten-1 z-depth-0"},"Join Session"))),this.state.joinSessionError?r.a.createElement("p",{className:"red-text"},this.state.joinSessionError):null),r.a.createElement("h5",{className:"black-text text-darken-3"},"Active Sessions"),this.getSessions()&&0!==this.getSessions().length?this.getSessions().map((function(t){return r.a.createElement("div",{key:t.sessionID},r.a.createElement("span",{className:"green-text card-title"},r.a.createElement("a",{href:"https://play-that-song-fac18.firebaseapp.com/activeSession/"+t.sessionID},"Session ID: ",t.sessionID)),r.a.createElement("button",{className:"btn green lighten-1 z-depth-0",id:t.sessionID,onClick:e.deleteSession},"Delete Session"),r.a.createElement("hr",null))})):r.a.createElement("p",null,"You don't have any active sessions"))))),r.a.createElement("div",{className:"col s12 m5 offset-m1"},r.a.createElement(C,{notifications:n})))):r.a.createElement(h.a,{to:"/about"})}}]),t}(s.Component),T=Object(I.d)(Object(p.b)((function(e){return{auth:e.firebase.auth,notifications:e.firestore.ordered.notifications,songRequestSessions:e.firestore.data.songRequestSessions}}),(function(e){return{createSession:function(t,a){e(function(e,t){return function(a,n,s){(0,s.getFirestore)().collection("songRequestSessions").add({creatorID:e,session:{sessionID:t,songRequests:[]}}).then((function(){a({type:"SESSION_CREATED"})})).catch((function(e){a({type:"SESSION_CREATED_ERROR",error:e})}))}}(t,a))},deleteSession:function(t){e(function(e){return function(t,a,n){var s=(0,n.getFirestore)();e=parseInt(e,10),s.collection("songRequestSessions").where("session.sessionID","==",e).get().then((function(e){e.forEach((function(e){s.collection("songRequestSessions").doc(e.id).delete().then((function(){t({type:"DELETE_SESSION"})})).catch((function(e){t({type:"DELETE_SESSION_ERROR",error:e})}))}))})).catch((function(e){t({type:"DELETE_SESSION_ERROR",error:e})}))}}(t))}}})),Object(j.firestoreConnect)([{collection:"notifications",limit:10,orderBy:["time","desc"]},{collection:"songRequestSessions"}]))(w),U=a(61),k=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).handleClickUndo=function(e){e.preventDefault(),a.props.undoRequest(e.target.id,a.props.auth.uid,a.props.sessionID)},a.handleClickRequest=function(e){e.preventDefault(),a.props.createSongRequestFromDashboard(e.target.id,a.props.auth.uid,a.props.sessionID),a.props.deleteNotifications()},a}return Object(E.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.auth,a=e.song;return r.a.createElement("div",{className:"song-with-album card",id:a.id,key:a.id},r.a.createElement("img",{src:a.albumIMGURL,alt:"Album Cover"}),r.a.createElement("div",{className:"card-content"},r.a.createElement("span",{className:"card-title green-text"},r.a.createElement("a",{target:"_blank",rel:"noreferrer noopener",title:"Play on Spotify",href:a.externalURL,className:"green-text"},a.title)),r.a.createElement("p",{className:"black-text"},"Song \u2022 "+a.artists.join(", ")),r.a.createElement("p",{className:"black-text"},r.a.createElement("b",null,1===a.numRequests?a.numRequests+" Request":a.numRequests+" Requests")),a.requestors.includes(t.uid)?r.a.createElement("button",{onClick:this.handleClickUndo,id:a.songID,className:"btn green lighten-1 z-depth-0"},"Undo Request"):r.a.createElement("button",{onClick:this.handleClickRequest,id:a.songID,className:"btn green lighten-1 z-depth-0"},"Request Song")))}}]),t}(s.Component),x=Object(p.b)((function(e){return{auth:e.firebase.auth}}),(function(e){return{createSongRequestFromDashboard:function(t,a,n){e(Object(U.b)(t,a,n))},undoRequest:function(t,a,n){e(Object(U.e)(t,a,n))},deleteNotifications:function(){e(Object(U.c)())}}}))(k),A=function(e){var t=e.songs,a=e.sessionID;return r.a.createElement("div",{className:"sr-list section"},r.a.createElement("h3",{className:"card-title green-text"},"Song Requests"),t?t.slice().sort((function(e,t){return t.numRequests-e.numRequests})).map((function(e){return r.a.createElement(x,{sessionID:a,song:e,key:a})})):r.a.createElement("h6",{className:"black-text"},r.a.createElement("i",null,"No song requests")))},G=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).isValidURL=function(){var e=a.props,t=e.songRequestSessions,n=e.sessionID,s=!1;if(Object(j.isLoaded)(t)){for(var r in t)if(t[r].session.sessionID===parseInt(n)){s=!0;break}return!!s}return!1},a.returnSongRequests=function(){var e=a.props,t=e.songRequestSessions,n=e.sessionID;if(Object(j.isLoaded)(t)){var s=[];for(var r in t)if(t[r].session.sessionID===parseInt(n)){s=t[r].session.songRequests;break}return s}},a}return Object(E.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.auth,n=t.notifications,s=t.sessionID,c=t.songRequestSessions;return a.uid?Object(j.isLoaded)(c)&&!1===this.isValidURL()?r.a.createElement(h.a,{to:"/sessions"}):Object(j.isLoaded)(c)?r.a.createElement("div",null,r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-content break-line"},r.a.createElement("p",{className:"card-title green-text center"},r.a.createElement("b",null,"Session ",s)),r.a.createElement("p",{className:"black-text center"},"Share this code ",r.a.createElement("b",null,s)," or this link ",r.a.createElement("a",{href:"https://play-that-song-fac18.firebaseapp.com/activeSession/"+s},"https://play-that-song-fac18.firebaseapp.com/activeSession/"+s)," with people to allow them to make requests"),r.a.createElement("br",null),r.a.createElement("p",{className:"black-text center"},"Navigate to ",r.a.createElement("a",{href:"https://play-that-song-fac18.firebaseapp.com/activeSession/"+s},"https://play-that-song-fac18.firebaseapp.com/activeSession/"+s)," to start requesting songs or go to ",r.a.createElement("a",{href:"https://play-that-song-fac18.firebaseapp.com/sessions"},"https://play-that-song-fac18.firebaseapp.com/sessions")," to check out your other active sessions"),r.a.createElement("div",{className:"srButton"},r.a.createElement("button",{onClick:function(){return e.props.history.push("/activeSession/"+s+"/createSR")},className:"btn green center lighten-1 z-depth-0"},"Create Song Request"))))),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12 m6"},r.a.createElement(A,{sessionID:this.props.sessionID,songs:this.returnSongRequests()})),r.a.createElement("div",{className:"col s12 m5 offset-m1"},r.a.createElement(C,{notifications:n}))))):r.a.createElement("center",null,r.a.createElement("div",{className:"preloader-wrapper big active"},r.a.createElement("div",{className:"spinner-layer spinner-green-only"},r.a.createElement("div",{className:"circle-clipper left"},r.a.createElement("div",{className:"circle"})),r.a.createElement("div",{className:"gap-patch"},r.a.createElement("div",{className:"circle"})),r.a.createElement("div",{className:"circle-clipper right"},r.a.createElement("div",{className:"circle"}))))):r.a.createElement(h.a,{to:"/about"})}}]),t}(s.Component),F=Object(I.d)(Object(p.b)((function(e,t){var a=t.match.params.session_id;return{auth:e.firebase.auth,notifications:e.firestore.ordered.notifications,songRequestSessions:e.firestore.data.songRequestSessions,sessionID:a}})),Object(j.firestoreConnect)([{collection:"notifications",limit:10,orderBy:["time","desc"]},{collection:"songRequestSessions"}]))(G),L=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(E.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(d.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(b,null),r.a.createElement(h.d,null,r.a.createElement(h.b,{exact:!0,path:"/",component:T}),r.a.createElement(h.b,{path:"/about",component:R}),r.a.createElement(h.b,{path:"/song/:id",component:S}),r.a.createElement(h.b,{path:"/signin",component:v}),r.a.createElement(h.b,{path:"/signup",component:y}),r.a.createElement(h.b,{path:"/sessions",component:T}),r.a.createElement(h.b,{exact:!0,path:"/activeSession/:session_id",component:F}),r.a.createElement(h.b,{path:"/activeSession/:session_id/createSR",component:_.a}))))}}]),t}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var P=a(21),Q={authError:null},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SIGNIN_ERROR":return Object(P.a)({},e,{authError:"Sign In Failed - Email or Password Incorrect"});case"SIGNIN_SUCCESS":return Object(P.a)({},e,{authError:null});case"SIGNOUT_SUCCESS":case"SIGNOUT_ERROR":return e;case"SIGNUP_SUCCESS":return Object(P.a)({},e,{authError:null});case"SIGNUP_ERROR":return Object(P.a)({},e,{authError:t.err.message});case"CLEAR_ERROR":return Object(P.a)({},e,{authError:null});default:return e}},B={reqError:null},M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_SONG_REQUEST":return e;case"CREATE_SONG_REQUEST_ERROR":return Object(P.a)({},e,{reqError:t.err});case"UPDATE_SONG_REQUEST":return e;case"UPDATE_SONG_REQUEST_ERROR":case"ALREADY_REQUESTED":case"SONG_REQUEST_ERROR":case"GET_DOCUMENT_ERROR":return Object(P.a)({},e,{reqError:t.err});case"CLEAR_ERROR":return Object(P.a)({},e,{reqError:null});case"UNDO_SONG_REQUEST":return e;case"UNDO_SONG_REQUEST_ERROR":return Object(P.a)({},e,{reqError:t.err});case"DELETE_NOTIF":return e;case"DELETE_NOTIF_ERROR":return Object(P.a)({},e,{reqError:t.err});default:return e}},W={sessError:null,sessionIDs:[]},J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SESSION_CREATED":return e;case"SESSION_CREATED_ERROR":return Object(P.a)({},e,{sessError:t.error});case"DELETE_SESSION":return e;case"DELETE_SESSION_ERROR":return Object(P.a)({},e,{sessError:t.error});default:return e}},V=a(89),Y=Object(I.c)({auth:z,song:M,session:J,firestore:V.firestoreReducer,firebase:j.firebaseReducer}),K=a(374),H=a(62),X=a.n(H);a(776),a(779),a(782);X.a.initializeApp({apiKey:"AIzaSyCiS_fQpcw_1JGpyXgdcb-f7n3U8fOCz2M",authDomain:"play-that-song-fac18.firebaseapp.com",databaseURL:"https://play-that-song-fac18.firebaseio.com",projectId:"play-that-song-fac18",storageBucket:"play-that-song-fac18.appspot.com",messagingSenderId:"843690786024",appId:"1:843690786024:web:dbf48faf223b36c2c39d5d",measurementId:"G-6092ZKX3KV"}),X.a.analytics(),X.a.firestore();var Z,$=X.a,ee=Object(I.e)(Y,Object(I.d)(Object(I.a)(K.a.withExtraArgument({getFirestore:V.getFirestore,getFirebase:j.getFirebase})),Object(V.reduxFirestore)(X.a,$))),te=(Z={firebase:X.a,config:$},Object(n.a)(Z,"config",{userProfile:"users",useFirestoreForProfile:!0,enableRedirectHandling:!1,resetBeforeLogin:!1}),Object(n.a)(Z,"dispatch",ee.dispatch),Object(n.a)(Z,"createFirestoreInstance",V.createFirestoreInstance),Object(n.a)(Z,"userProfile","users"),Object(n.a)(Z,"presence","presence"),Object(n.a)(Z,"sessions","sessions"),Z);i.a.render(r.a.createElement(p.a,{store:ee},r.a.createElement(j.ReactReduxFirebaseProvider,te,r.a.createElement((function(e){var t=e.children,a=Object(p.c)((function(e){return e.firebase.auth}));return Object(j.isLoaded)(a)?t:r.a.createElement("center",null,r.a.createElement("div",{className:"preloader-wrapper big active"},r.a.createElement("div",{className:"spinner-layer spinner-green-only"},r.a.createElement("div",{className:"circle-clipper left"},r.a.createElement("div",{className:"circle"})),r.a.createElement("div",{className:"gap-patch"},r.a.createElement("div",{className:"circle"})),r.a.createElement("div",{className:"circle-clipper right"},r.a.createElement("div",{className:"circle"})))))}),null,r.a.createElement(L,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[376,1,2]]]);
//# sourceMappingURL=main.26080fb8.chunk.js.map