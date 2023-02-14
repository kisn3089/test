(()=>{"use strict";const e=document.getElementsByClassName("ok-btn")[0],t=document.getElementsByClassName("grade")[0],s=document.getElementsByClassName("grade-des1")[0],r=document.getElementsByClassName("grade-des2")[0],a=document.getElementsByClassName("grade-des3")[0],m=document.getElementsByClassName("hr-rate")[0],n=document.getElementsByClassName("msi-rate")[0],u=document.getElementsByClassName("psi-rate")[0],d=document.getElementsByClassName("my-position"),N=document.getElementsByClassName("face-err")[0];let o,b,i,l=sessionStorage.getItem("hr"),c=sessionStorage.getItem("msi"),g=sessionStorage.getItem("psi"),L=sessionStorage.getItem("age"),h=sessionStorage.getItem("face");m.textContent=l,n.textContent=c.slice(0,4),u.textContent=g.slice(0,4),sessionStorage.setItem("age",""),sessionStorage.setItem("gender",""),N.classList.remove("on"),h>10&&N.classList.add("on"),Number(L)<=25?Number(l)>=63&&Number(l)<=81?(d[0].classList.add("healthy"),o=50):Number(l)>=59&&Number(l)<63||Number(l)>81&&Number(l)<=85?(d[0].classList.add("normal"),o=40):Number(l)>=56&&Number(l)<59||Number(l)>85&&Number(l)<=88?(d[0].classList.add("caution"),o=30):Number(l)>=52&&Number(l)<56||Number(l)>88&&Number(l)<=92?(d[0].classList.add("warning"),o=20):(Number(l)>=0&&Number(l)<52||Number(l)>92)&&(d[0].classList.add("danger"),o=10):Number(L)>25||Number(L)<=35?Number(l)>=62&&Number(l)<=81?(d[0].classList.add("healthy"),o=50):Number(l)>=58&&Number(l)<62||Number(l)>81&&Number(l)<=85?(d[0].classList.add("normal"),o=40):Number(l)>=55&&Number(l)<58||Number(l)>85&&Number(l)<=88?(d[0].classList.add("caution"),o=30):Number(l)>=51&&Number(l)<55||Number(l)>88&&Number(l)<=92?(d[0].classList.add("warning"),o=20):(Number(l)>=0&&Number(l)<51||Number(l)>92)&&(d[0].classList.add("danger"),o=10):Number(L)>36||Number(L)<=45?Number(l)>=62&&Number(l)<=82?(d[0].classList.add("healthy"),o=50):Number(l)>=58&&Number(l)<62||Number(l)>82&&Number(l)<=86?(d[0].classList.add("normal"),o=40):Number(l)>=55&&Number(l)<58||Number(l)>86&&Number(l)<=89?(d[0].classList.add("caution"),o=30):Number(l)>=51&&Number(l)<55||Number(l)>89&&Number(l)<=93?(d[0].classList.add("warning"),o=20):(Number(l)>=0&&Number(l)<51||Number(l)>93)&&(d[0].classList.add("danger"),o=10):Number(L)>46||Number(L)<=55||Number(L)>56||Number(L)<=65?Number(l)>=61&&Number(l)<=83?(d[0].classList.add("healthy"),o=50):Number(l)>=57&&Number(l)<61||Number(l)>83&&Number(l)<=87?(d[0].classList.add("normal"),o=40):Number(l)>=54&&Number(l)<57||Number(l)>87&&Number(l)<=90?(d[0].classList.add("caution"),o=30):Number(l)>=50&&Number(l)<54||Number(l)>90&&Number(l)<=94?(d[0].classList.add("warning"),o=20):(Number(l)>=0&&Number(l)<50||Number(l)>94)&&(d[0].classList.add("danger"),o=10):Number(L)>65&&(Number(l)>=63&&Number(l)<=81?(d[0].classList.add("healthy"),o=50):Number(l)>=59&&Number(l)<63||Number(l)>81&&Number(l)<=85?(d[0].classList.add("normal"),o=40):Number(l)>=56&&Number(l)<59||Number(l)>85&&Number(l)<=88?(d[0].classList.add("caution"),o=30):Number(l)>=52&&Number(l)<56||Number(l)>88&&Number(l)<=92?(d[0].classList.add("warning"),o=20):(Number(l)>=0&&Number(l)<52||Number(l)>92)&&(d[0].classList.add("danger"),o=10)),Number(g)<=.1?(d[2].classList.add("healthy"),i=25):Number(g)>.1&&Number(g)<=.5?(d[2].classList.add("normal"),i=19.5):Number(g)>.5&&Number(g)<=1?(d[2].classList.add("caution"),i=14):Number(g)>1&&Number(g)<3?(d[2].classList.add("warning"),i=8.5):Number(g)>=3&&(d[2].classList.add("danger"),i=4),Number(c)<=.1?(d[1].classList.add("healthy"),b=25):Number(c)>.1&&Number(c)<=.5?(d[1].classList.add("normal"),b=19.5):Number(c)>.5&&Number(c)<=1?(d[1].classList.add("caution"),b=14):Number(c)>1&&Number(c)<3?(d[1].classList.add("warning"),b=8.5):Number(c)>=3&&(d[1].classList.add("danger"),b=4);let C=o+i+b;C>90?(t.classList.add("one"),t.textContent="Grade 1",s.textContent="You are very healthy.",r.textContent="Try to improve your lifestyle",a.textContent="to stay healthy."):C>=70&&C<90?(t.classList.add("two"),t.textContent="Grade 2",s.textContent="Your health is normal.",r.textContent="Please take care of your diet",a.textContent="and exercise steadily."):C>=60&&C<70?(t.classList.add("three"),t.textContent="Grade 3",s.textContent="Take care of your health.",r.textContent="Refrain from eating greasy food and",a.textContent="don't forget that prevention is important!"):C>=50&&C<60?(t.classList.add("four"),t.textContent="Grade 4",s.textContent="Your health is not good.",r.textContent="We recommend you to exercise regularly",a.textContent="and get enough rest."):C<50&&(t.classList.add("five"),t.textContent="Grade 5",s.textContent="There is an urgent need for",r.textContent="improvement in health.",a.textContent="We recommend you consult a doctor."),e.addEventListener("click",(function(){sessionStorage.setItem("hr",""),sessionStorage.setItem("psi",""),sessionStorage.setItem("msi",""),sessionStorage.setItem("gender",""),sessionStorage.setItem("age",""),location.href="./index.html"}))})();