// 橙色： 3碰1卡，开局2卡，2碰50%币，4碰5卡，结算20%币，3碰100%币，幸运色100%币     7种
// 紫色： 开局1卡，2碰20%币，幸运色50%币，清台3卡，全家福5卡，3碰35%币，5碰10卡     7种
// 蓝色： 2碰10%币，5碰5卡，幸运色20%币，3碰10%币       4种

type touchCardType = {
    abilityNo: number;
    touchNum: number;
    addCard: number;
}
// 碰加卡4种，1-4
const touchCardList: touchCardType[] = [
    // 橙色
    {
        abilityNo: 1,
        touchNum: 3,
        addCard: 1
    },
    {
        abilityNo: 2,
        touchNum: 4,
        addCard: 5
    },
    // 紫色
    {
        abilityNo: 3,
        touchNum: 5,
        addCard: 10
    },
    // 蓝色
    {
        abilityNo: 4,
        touchNum: 5,
        addCard: 5
    },
];

type touchCoinsType = {
    abilityNo: number;
    touchNum: number;
    addCoins: number;
}
// 碰加币6种，5-10
const touchCoinsList: touchCoinsType[] = [
    // 橙色
    {
        abilityNo: 5,
        touchNum: 2,
        addCoins: 0.5
    },
    {
        abilityNo: 6,
        touchNum: 3,
        addCoins: 1
    },
    // 紫色
    {
        abilityNo: 7,
        touchNum: 2,
        addCoins: 0.2
    },
    {
        abilityNo: 8,
        touchNum: 3,
        addCoins: 0.35
    },
    // 蓝色
    {
        abilityNo: 9,
        touchNum: 2,
        addCoins: 0.1
    },
    {
        abilityNo: 10,
        touchNum: 3,
        addCoins: 0.1
    },
];

type CardType = {
    abilityNo: number;
    addCard: number;
}
// 非碰加卡4种，11-14
const cardList: CardType[] = [
    // 开局橙色
    {
        abilityNo: 11,
        addCard: 2
    },
    // 开局紫色
    {
        abilityNo: 12,
        addCard: 1
    },
    // 清台
    {
        abilityNo: 13,
        addCard: 3
    },
    // 全家福
    {
        abilityNo: 14,
        addCard: 5
    },
];

type CoinsType = {
    abilityNo: number;
    addCoins: number;
}
// 非碰加币4种，15-18
const coinsList: CoinsType[] = [
    // 结算
    {
        abilityNo: 15,
        addCoins: 0.2
    },
    // 幸运色
    {
        abilityNo: 16,
        addCoins: 1
    },
    {
        abilityNo: 17,
        addCoins: 0.5
    },
    {
        abilityNo: 18,
        addCoins: 0.2
    },
];

type awardType = {
    awardNo: number;
    coins: number;
    card: number;
}
const awardList: awardType[] = [
    // 幸运色
    {
        awardNo: 1,
        coins: 100,
        card: 1
    },
    // 碰
    {
        awardNo: 2,
        coins: 100,
        card: 1
    },
    {
        awardNo: 3,
        coins: 200,
        card: 3
    },
    {
        awardNo: 4,
        coins: 800,
        card: 5
    },
    {
        awardNo: 5,
        coins: 5000,
        card: 8
    },
    {
        awardNo: 6,
        coins: 10000,
        card: 10
    },
    {
        awardNo: 7,
        coins: 20000,
        card: 20
    },
    {
        awardNo: 8,
        coins: 30000,
        card: 30
    },
    // 全家福
    {
        awardNo: 9,
        coins: 1888,
        card: 8
    },
    // 清台
    {
        awardNo: 10,
        coins: 666,
        card: 5
    },
];

function containsAny(totalAbilityList: any[], nowAbilityList: any[]): boolean {
    return nowAbilityList.some(ability => totalAbilityList.includes(ability));
}

// 能力
const totalAbilityList: { abilityNo: number }[] = [...touchCardList, ...touchCoinsList, ...cardList, ...coinsList];

function getRandomColor() {
    return Math.floor(Math.random() * 8);
}
function getRandomColorTimes(times: number) {
    const randomColorList: number[] = [];
    for (let i = 0; i < times; i++) {
        randomColorList.push(getRandomColor());
    }
    return randomColorList;
}

const nowAbilityList = [totalAbilityList[1]]

function main() {
    const luckyColorNumber = 0;
    const startAddCard = nowAbilityList.reduce((num: number, ability) => {
        if (ability.abilityNo === 11) num += 2;
        else if (ability.abilityNo === 12) num += 1;

        return num;
    }, 0);

    console.log('startAddCard: ', startAddCard);
    // 卡包
    const cardBag = getRandomColorTimes(13 + startAddCard);
    console.log('cardBag: ', cardBag);

    // 轮盘
    let roulette: number[] = [];
    while (cardBag.length !== 0) {
        while (roulette.length !== 8 && cardBag.length !== 0) {
            roulette.push(cardBag.pop()!);
        }
        console.log('roulette: ', roulette);
        console.log('cardBag: ', cardBag);

        for (let i = 0; i < 8; i++){
            
        }
        roulette = [];
        console.log("!!!!!!!!!!!!!!!!!!");
    }
}

main()

