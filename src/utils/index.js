const date = new Date().getTime();

export const getTime = time => {
    let t = new Date(time).getTime();
    let value = (date - t) / 1000; // 换算成秒 
    let twoMinute = 2 * 60;
    let nMinute = 60 * 60;
    let oneDay = 24 * 60 * 60;
    let oneWeek = 7 * 24 * 60 * 60;

    if (value <= twoMinute) { // 相差2分钟内
        return "刚刚";
    } else if (twoMinute <= value && value <= nMinute) {  // 2分钟到1小时内分钟
        return parseInt(value / 60) + "分钟前";
    } else if (nMinute <= value && value <= oneDay) { // 相差24小时以内
        return parseInt(value / 60 / 60) + "小时内";
    } else if (oneDay <= value && value <= oneWeek) { // 相差7天内
        return parseInt(value / 60 / 60 / 24) + "天前";
    } else if (oneWeek <= value) { //超过七天显示
        let data1 = new Date(time);
        let year = data1.getFullYear();
        let month = data1.getMonth() + 1;
        let day = data1.getDate();
        let time3 = year + '-' + month + '-' + day;
        return time3;
    }
}

import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)

export default BScroll