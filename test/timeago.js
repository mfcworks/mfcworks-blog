
/**
 * 2つの時刻(Dateオブジェクト)の差分を取り、どのくらいの期間の隔たりがあるかを返します。
 * 
 * @param {Date} past       過去時点の時刻
 * @param {Date} current    現在時刻
 * 
 * 隔たりの最大 返り値
 * 1秒まで      '0秒前'
 * 1分まで      '〇秒前'
 * 1時間まで    '〇分前'
 * 1日まで      '〇時間前'
 * 1週間まで    '〇日前'
 * 1ヵ月まで    '〇週間前'
 * 1年まで      '〇ヵ月前'
 * それ以上     '〇年前'
 */

const timeAgo = (past, current) => {
    const diff = (current - past) / 1000; //差分(秒)

    const second = 1;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * (365 / 7 / 12);
    const year = day * 365;

    if (diff < second) { return '0秒前'; }
    if (diff < minute) { return Math.trunc(diff / second) + '秒前'; }
    if (diff < hour) { return Math.trunc(diff / minute) + '分前'; }
    if (diff < day) { return Math.trunc(diff / hour) + '時間前'; }
    if (diff < week) { return Math.trunc(diff / day) + '日前'; }
    if (diff < month) { return Math.trunc(diff / week) + '週間前'; }
    if (diff < year) { return Math.trunc(diff / month) + 'ヵ月前'; }
    return Math.trunc(diff / year) + '年前';
}

module.exports = timeAgo;