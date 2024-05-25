namespace deepmodel;

entity XTBL003 {
    key FLOWUUID : UUID @(Core.Computed : true);
    key FLOWCODE : String(5);
    key STATUS : String(2);
    DETAIL : Composition of many XTBL004
            on DETAIL.FLOWUUID = FLOWUUID
            and DETAIL.FLOWCODE = FLOWCODE
            and DETAIL.STATUS = STATUS; 
    FIELD01 : String(100);
    FIELD02 : String(100);
} 

entity XTBL004 {
    key FLOWUUID : UUID @(Core.Computed : true);
    key FLOWCODE : String(5);
    key NO1 : String(2);
    STATUS : String(2);
    APPROVAL_NAME : String(100);
} 
