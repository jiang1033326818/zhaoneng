function hasClass(ele, cls) {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length === 0) return false; //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
}
const Operation = {

    isExceedFileSizeLimit: function(filesize) {
        const isExceedFileLimit = filesize / 1024 / 1024 > 2;
        return isExceedFileLimit;
    },


        UniqueArray: function(array) {
            var tmp = [];
            var json = {};
            for (var i = 0; i < array.length; i++) {
                if (!json[array[i]]) {
                    tmp.push(array[i]);
                    json[array[i]] = 1;
                }
            }
            return tmp;
        },

        UniqueObjectArray:function (array,key) {
            const tmp = [];
            var keys =[]

            array.forEach((item)=>{
                if (!this.IsContains(keys, item[key])) {
                    tmp.push(item);
                    keys.push(item[key])
                }
            })
            return tmp;
        },

        IsContains: function(array, obj) {
            var i = array.length;
            while (i--) {
                if (array[i] === obj) {
                    return true;
                }
            }
            return false;
        },


        RemoveObjFromArray: function(array, target) {
            for (var i = 0; i < array.length; i++) {
                const obj =  array[i];
                if (obj === target) {
                    array.splice(i, 1);
                    return;
                }

                if (obj.id === target.id) {
                    array.splice(i, 1);
                    return;
                }
            }
        },

        getNodeIds : function(json, id, subkey) {

            //先将树状结构的json,以id为key ,以自身对象为value,放到数组中,然后在此数组中查找 key == id时，即此节点找到,
            //再将id 赋值为此节点的父id,继续遍历,直到最顶层
            var dictArr = [];
            const loop = data => data.forEach((item, idx) => {
                if (item[subkey]) {
                    loop(item[subkey])
                }
                var obj = {};
                obj[item.id] = item;
                dictArr.push(obj)
            });
            loop(json);

            var idsArr = [];
            for (var i = 0; i < dictArr.length; i++) {
                const item = dictArr[i];
                const keys = Object.keys(item);
                if (parseInt(keys[0],10) === id) {
                    const values = Object.values(item);
                    idsArr.unshift(values[0].id);
                    id = values[0].parentId;
                }
            }
            return idsArr;
        },


        getNodeObject : function(json, id, subkey) {

            //先将树状结构的json,以id为key ,以自身对象为value,放到数组中,然后在此数组中查找 key == id时，即此节点找到,
            //再将id 赋值为此节点的父id,继续遍历,直到最顶层
            var dictArr = [];
            const loop = data => data.forEach((item, idx) => {
                if (item[subkey]) {
                    loop(item[subkey])
                }
                var obj = {};
                obj[item.id] = item;
                dictArr.push(obj)
            });
            loop(json);

            var object = {};
            for (var i = 0; i < dictArr.length; i++) {
                const item = dictArr[i];
                const keys = Object.keys(item);
                if (parseInt(keys[0],10) === id) {
                     object = Object.values(item)[0];
                }
            }

            return object;
        },

        getNodeNames : function(json, id, subkey) {
            // console.log(json)
            //先将树状结构的json,以id为key ,以自身对象为value,放到数组中,然后在此数组中查找 key == id时，即此节点找到,
            //再将id 赋值为此节点的父id,继续遍历,直到最顶层
            var dictArr = [];
            const loop = data => data.forEach((item, idx) => {
                if (item[subkey]) {
                    loop(item[subkey])
                }
                var obj = {};
                obj[item.id] = item;
                dictArr.push(obj)
            });
            loop(json);

            var idsArr = [];
            for (var i = 0; i < dictArr.length; i++) {
                const item = dictArr[i];
                const keys = Object.keys(item);
                if (parseInt(keys[0],10) === id) {
                    const values = Object.values(item);
                    idsArr.push(values[0].name);
                    id = values[0].parentId;
                }
            }
            return idsArr.reverse().join('/');
        },
        addClass : function (ele, cls) {
            if (!hasClass(ele, cls)) {
                ele.className = (ele.className === '') ? cls : ele.className + ' ' + cls;
            }
        },
        removeClass : function(ele, cls) {
            if (hasClass(ele, cls)) {
                var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
                while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                  newClass = newClass.replace(' ' + cls + ' ', ' ');
                }
                ele.className = newClass.replace(/^\s+|\s+$/g, '');
            }
        },
        siblings: function(elm) {
            var a = [];
            var p = elm.parentNode.children;
            for(var i =0,pl= p.length;i<pl;i++) {
               if(p[i] !== elm) a.push(p[i]);
            }
            return a;
        },

        brotherInLaw: function(elm) {//获取  '从兄弟们'
            const brother = this.siblings(elm);
            let all = brother;
            let grandpa = elm.parentNode.parentNode//爷爷
            const grandpaBrothers = this.siblings(grandpa);//叔伯祖们

            for(let i =0; i < grandpaBrothers.length;i++) {
                let grandpaBrother = grandpaBrothers[i];
                let uncles = grandpaBrother.children[1];//堂叔父们
                for (let j = 0; j < uncles.children.length; j++) {
                     let son = uncles.children[j];//从兄弟
                     all.push(son)
                }
            }
            return all;
        },

        hasClass:function(ele, cls) {
            cls = cls || '';
            if (cls.replace(/\s/g, '').length === 0) return false; //当cls没有参数时，返回false
            return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
        }
    }

    module.exports = Operation;
