using { deepmodel as my } from '../db/deepmodel01';
service DeepService {

  entity XTBL003 as projection on my.XTBL003;
  entity XTBL004 as projection on my.XTBL004;

}
