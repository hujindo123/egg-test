module.exports = {
    //根据菜单主键id获取下级菜单
    GetData(id, arry) {
        let childArry = this.GetParentArry(id, arry);
        if (childArry.length > 0) {
            for (var i in childArry) {
                var rs = this.GetParentArry(childArry[i].menu_id, arry);
                if(rs){
                    console.log(rs);
                    childArry[i].children = rs;
                }
            }
        }
        return childArry;
    },
//id：菜单主键id
//arry：菜单数组信息
    GetParentArry(id, arry) {
        var newArry = new Array();
        for (var i in arry) {
            if (arry[i].parent_id == id)
                newArry.push(arry[i]);
        }
        return newArry;
    }
};