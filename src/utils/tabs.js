let tabsHead = document.querySelectorAll('.tabs-header ul > li');
let tabsBody = document.querySelectorAll('.tabs-body');

for (let i = 0; i < tabsHead.length; i++) {
    tabsHead[i].onclick = () => {
        for (let j = 0; j < tabsHead.length; j++) {
            if (j === i) {
                tabsHead[j].classList.add('active');
                tabsBody[j].classList.add('active');
            } else {
                tabsHead[j].classList.remove('active');
                tabsBody[j].classList.remove('active');
            }
        }
    };
}
