/* Edu Play Lab — Shared Player Scheduler v1 */
(function(global){
  'use strict';
  const DEFAULT_ORDER=['red','yellow','green','orange','purple','blue'];
  function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function playerRecord(groups,g,player){return{groupId:g,groupName:groups[g].name,color:groups[g].color,player};}
  function createBalancedTenRound(groups,options={}){
    const order=options.groupOrder||DEFAULT_ORDER;
    const base=[[0,1,2],[3,4,5],[0,3,4],[1,2,5],[0,1,3],[2,4,5],[0,2,4],[1,3,5],[0,1,5],[2,3,4]];
    const perm=shuffle(order),mapped=base.map(t=>t.map(i=>perm[i])),roundGroups=options.shuffleRoundOrder===false?mapped:shuffle(mapped),pools={},cursors={};
    order.forEach(g=>{pools[g]=shuffle(groups[g].players);cursors[g]=0;});
    return roundGroups.map((triple,ri)=>shuffle(triple.map(g=>playerRecord(groups,g,pools[g][cursors[g]++]))).map((x,lane)=>({...x,lane,round:ri+1})));
  }
  function createJeopardySchedule(groups,values,options={}){
    const order=options.groupOrder||DEFAULT_ORDER,shuffledPlayers={};order.forEach(g=>shuffledPlayers[g]=shuffle(groups[g].players));const schedule=[];
    values.forEach((value,vi)=>{const groupOrder=shuffle(order);for(let half=0;half<2;half++){const triple=groupOrder.slice(half*3,half*3+3).map(g=>({...playerRecord(groups,g,shuffledPlayers[g][vi]),value}));schedule.push(shuffle(triple).map((p,lane)=>({...p,lane,round:schedule.length+1})));}});
    return schedule;
  }
  global.EduPlayScheduler={shuffle,createBalancedTenRound,createJeopardySchedule};
})(window);
