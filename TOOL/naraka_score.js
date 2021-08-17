const baseParse = _ => {
    const role_path = "hiker://files/rules/js/TyrantGenesis_永劫无间绑定.js"
    let d = [];
    let roleId = ''

    let current_page = MY_URL.split('##')[1].toString()

    if (current_page === '1') {
        d.push({
            title: '绑定',
            desc: '请输入游戏ID',
            url: "input.trim() ? $('hiker://empty').lazyRule(params => {eval(fetch('hiker://files/TyrantG/TOOL/naraka_score.js'));return setRoleId(params);}, {input: input.trim()}) : 'toast://请输入游戏ID'",
            col_type: "input"
        })
    }

    if (fetch(role_path)) {
        if (current_page === '1') {
            const channel_select = getVar("tyrantgenesis.youtube.channel_select", "0")
            roleId = fetch(role_path)
            let careerData = "https://gamedb.gamersky.com/yjwujian/career/getCareerData?gamerskyId=5861820&identity=0&roleId="+roleId
        }

        let listData = "https://gamedb.gamersky.com/yjwujian/record/getRecentRecords?roleId="+roleId+"&pageIndex="+current_page+"&pageSize=20"
        let res_json = fetch(listData)
        let res = JSON.parse(res_json)
        if (res.code === 0) {

        } else {
            d.push({
                title: res.message,
                col_type: 'long_text',
            })
        }

    }

    setResult(d);
}

const setRoleId = params => {
    const role_path = "hiker://files/rules/js/TyrantGenesis_永劫无间绑定.js"
    let res_json = fetch("https://gamedb.gamersky.com/yjwujian/search/getSearchResult?roleName="+params.input)
    let res = JSON.parse(res_json)
    if (res.data.length > 0) {
        writeFile(role_path, res.data[0].roleId)
        refreshPage(false)
        return 'hiker://empty'
    } else {
        refreshPage(false)
        return 'toast://查找不到玩家数据'
    }
}