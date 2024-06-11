
wwww.tigir.com - 14.06.2006
Р‘РёР±Р»РёРѕС‚РµРєР° hltable.js РёР· СЃС‚Р°С‚СЊРё "РџРѕРґСЃРІРµС‡РёРІР°РЅРёРµ СЃС‚СЂРѕРє С‚Р°Р±Р»РёС†С‹" - http://www.tigir.com/highlight_table_rows.htm


function highlightTableRows(tableId, hoverClass, clickClass, multiple)
{
    var table = document.getElementById(tableId);

    //РµСЃР»Рё РЅРµ Р±С‹Р» РїРµСЂРµРґР°РЅ С‡РµС‚РІРµСЂС‚С‹Р№ Р°СЂРіСѓРјРµРЅС‚, С‚Рѕ РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ РїСЂРёРЅРёРјР°РµРј РµРіРѕ РєР°Рє true
    if (typeof multiple == 'undefined') multiple = true;

    if (hoverClass)
    {
        //СЂРµРіСѓР»СЏСЂРЅРѕРµ РІС‹СЂР°Р¶РµРЅРёРµ РґР»СЏ РїРѕРёСЃРєР° СЃСЂРµРґРё Р·РЅР°С‡РµРЅРёР№ Р°С‚СЂРёР±СѓС‚Р° class СЌР»РµРјРµРЅС‚Р°, РёРјРµРЅРё РєР»Р°СЃСЃР° РѕР±РµСЃРїРµС‡РёРІР°СЋС‰РµРіРѕ РїРѕРґСЃРІРµС‚РєСѓ РїРѕ РЅР°РІРµРґРµРЅРёСЋ РјС‹С€Рё РЅР° СЃС‚СЂРѕРєСѓ.
        //Р”Р°РЅРЅРѕРµ СЂРµРі. РІС‹СЂР°Р¶РµРЅРёРµ РёСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ Рё РІ РѕР±СЂР°Р±РѕС‚С‡РёРєРµ onclick
        var hoverClassReg = new RegExp("\\b"+hoverClass+"\\b");

        table.onmouseover = table.onmouseout = function(e)
        {
            if (!e) e = window.event;
            var elem = e.target || e.srcElement;
            while (!elem.tagName || !elem.tagName.match(/td|th|table/i)) elem = elem.parentNode;

            //Р•СЃР»Рё СЃРѕР±С‹С‚РёРµ СЃРІСЏР·Р°РЅРѕ СЃ СЌР»РµРјРµРЅС‚РѕРј TD РёР»Рё TH РёР· СЂР°Р·РґРµР»Р° TBODY
            if (elem.parentNode.tagName == 'TR' && elem.parentNode.parentNode.tagName == 'TBODY')
            {
                var row = elem.parentNode;//СЂСЏРґ СЃРѕРґРµСЂР¶Р°С‰РёР№ СЏС‡РµР№РєСѓ С‚Р°Р±Р»РёС†С‹ РІ РєРѕС‚РѕСЂРѕР№ РїСЂРѕРёР·РѕС€Р»Рѕ СЃРѕР±С‹С‚РёРµ
                //Р•СЃР»Рё С‚РµРєСѓС‰РёР№ СЂСЏРґ РЅРµ "РєР»РёРєРЅСѓС‚С‹Р№" СЂСЏРґ, С‚Рѕ РІ СЂР°Р·РёСЃРёРјРѕСЃС‚Рё РѕС‚ СЃРѕР±С‹С‚РёСЏ Р»РёР±Рѕ РїСЂРёРјРµРЅСЏРµРј СЃС‚РёР»СЊ, РЅР°Р·РЅР°С‡Р°СЏ РєР»Р°СЃСЃ, Р»РёР±Рѕ СѓР±РёСЂР°РµРј.
                if (!row.getAttribute('clickedRow')) row.className = e.type=="mouseover"?row.className+" "+hoverClass:row.className.replace(hoverClassReg," ");
            }
        };
    }


    if (clickClass) table.onclick = function(e)
    {
        if (!e) e = window.event;
        var elem = e.target || e.srcElement;
        while (!elem.tagName || !elem.tagName.match(/td|th|table/i)) elem = elem.parentNode;

        //Р•СЃР»Рё СЃРѕР±С‹С‚РёРµ СЃРІСЏР·Р°РЅРѕ СЃ СЌР»РµРјРµРЅС‚РѕРј TD РёР»Рё TH РёР· СЂР°Р·РґРµР»Р° TBODY
        if (elem.parentNode.tagName == 'TR' && elem.parentNode.parentNode.tagName == 'TBODY')
        {
            //СЂРµРіСѓР»СЏСЂРЅРѕРµ РІС‹СЂР°Р¶РµРЅРёРµ РґР»СЏ РїРѕРёСЃРєР° СЃСЂРµРґРё Р·РЅР°С‡РµРЅРёР№ Р°С‚СЂРёР±СѓС‚Р° class СЌР»РµРјРµРЅС‚Р°, РёРјРµРЅРё РєР»Р°СЃСЃР° РѕР±РµСЃРїРµС‡РёРІР°СЋС‰РµРіРѕ РїРѕРґСЃРІРµС‚РєСѓ РїРѕ РєР»РёРєСѓ РЅР° СЃС‚СЂРѕРєРµ.
            var clickClassReg = new RegExp("\\b"+clickClass+"\\b");
            var row = elem.parentNode;//СЂСЏРґ СЃРѕРґРµСЂР¶Р°С‰РёР№ СЏС‡РµР№РєСѓ С‚Р°Р±Р»РёС†С‹ РІ РєРѕС‚РѕСЂРѕР№ РїСЂРѕРёР·РѕС€Р»Рѕ СЃРѕР±С‹С‚РёРµ

            //Р•СЃР»Рё С‚РµРєСѓС‰РёР№ СЂСЏРґ СѓР¶Рµ РїРѕРјРµС‡РµРЅ СЃС‚РёР»РµРј РєР°Рє "РєР»РёРєРЅСѓС‚С‹Р№"
            if (row.getAttribute('clickedRow'))
            {
                row.removeAttribute('clickedRow');//СѓР±РёСЂР°РµРј С„Р»Р°Рі С‚РѕРіРѕ С‡С‚Рѕ СЂСЏРґ "РєР»РёРєРЅСѓС‚"
                row.className = row.className.replace(clickClassReg, "");//СѓР±РёСЂР°РµРј СЃС‚РёР»СЊ РґР»СЏ РІС‹РґРµР»РµРЅРёСЏ РєР»РёРєРѕРј
                row.className += " "+hoverClass;//РЅР°Р·РЅР°С‡Р°РµРј РєР»Р°СЃСЃ РґР»СЏ РІС‹РґРµР»РµРЅРёСЏ СЃС‚СЂРѕРєРё РїРѕ РЅР°РІРµРґРµСЋ РјС‹С€Рё, С‚.Рє. РєСѓСЂСЃРѕСЂ РјС‹С€Рё РІ РґР°РЅРЅС‹Р№ РјРѕРјРµРЅС‚ РЅР° СЃС‚СЂРѕРєРµ, Р° РІС‹РґРµР»РµРЅРёРµ РїРѕ РєР»РёРєСѓ СѓР¶Рµ СЃРЅСЏС‚Рѕ
            }
            else //СЂСЏРґ РЅРµ РїРѕРґСЃРІРµС‡РµРЅ
            {
                //РµСЃР»Рё Р·Р°РґР°РЅР° РїРѕРґСЃРІРµС‚РєР° РїРѕ РЅР°РІРµРґРµРЅРёСЋ РЅР° СЃС‚СЂРѕРєСѓ, С‚Рѕ СѓР±РёСЂР°РµРј РµС‘
                if (hoverClass) row.className = row.className.replace(hoverClassReg, "");
                row.className += " "+clickClass;//РїСЂРёРјРµРЅСЏРµРј РєР»Р°СЃСЃ РїРѕРґСЃРІРµС‚РєРё РїРѕ РєР»РёРєСѓ
                row.setAttribute('clickedRow', true);//СѓСЃС‚Р°РЅР°РІР»РёРІР°РµРј С„Р»Р°Рі С‚РѕРіРѕ, С‡С‚Рѕ СЂСЏРґ РєР»РёРєРЅСѓС‚ Рё РїРѕРґСЃРІРµС‡РµРЅ

                //РµСЃР»Рё СЂР°Р·СЂРµС€РµРЅР° РїРѕРґСЃРІРµС‚РєР° С‚РѕР»СЊРєРѕ РїРѕСЃР»РµРґРЅРµР№ РєР»РёРєРЅСѓС‚РѕР№ СЃС‚СЂРѕРєРё
                if (!multiple)
                {
                    var lastRowI = table.getAttribute("lastClickedRowI");
                    //Р•СЃР»Рё С‚Рѕ С‚РµРєСѓС‰РµР№ СЃС‚СЂРѕРєРё Р±С‹Р»Р° РєР»РёРєРЅСѓС‚Р° РґСЂСѓРіР°СЏ СЃС‚СЂРѕРєР°, С‚Рѕ СЃРЅРёРјР°РµРј СЃ РЅРµС‘ РїРѕРґСЃРІРµС‚РєСѓ Рё С„Р»Р°Рі "РєР»РёРєРЅСѓС‚РѕСЃС‚Рё"
                    if (lastRowI!==null && lastRowI!=='' && row.sectionRowIndex!=lastRowI)
                    {
                        var lastRow = table.tBodies[0].rows[lastRowI];
                        lastRow.className = lastRow.className.replace(clickClassReg, "");//СЃРЅРёРјР°РµРј РїРѕРґСЃРІРµС‚РєСѓ СЃ РїСЂРµРґС‹РґСѓС‰РµР№ РєР»РёРєРЅСѓС‚РѕР№ СЃС‚СЂРѕРєРё
                        lastRow.removeAttribute('clickedRow');//СѓРґР°Р»СЏРµРј С„Р»Р°Рі "РєР»РёРєРЅСѓС‚РѕСЃС‚Рё" СЃ РїСЂРµРґС‹РґСѓС‰РµР№ РєР»РёРєРЅСѓС‚РѕР№ СЃС‚СЂРѕРєРё
                    }
                }
                //Р·Р°РїРѕРјРёРЅР°РµРј РёРЅРґРµРєСЃ РїРѕСЃР»РµРґРЅРµРіРѕ РєР»РёРєРЅСѓС‚РѕРіРѕ СЂСЏРґР°
                table.setAttribute("lastClickedRowI", row.sectionRowIndex);
            }
        }
    };
}