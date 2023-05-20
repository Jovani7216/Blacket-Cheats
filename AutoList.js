(async () => {
  if (!blacket.blooks) return alert('Please visit the Blooks page to run this.');
  
  let item = prompt('What Blook?');
  if (!blacket.blooks[item]) return alert('Enter a valid Blook name. Case matters.');
  
  let amt = Number(prompt('What amount?'));
  if (isNaN(amt) || amt < 1 || (Math.floor(amt) !== amt) || amt > blacket.user.blooks[item]) return alert('Invalid amount. You may also not have that many of the Blook.');
  
  let price = Number(prompt('What price?'));
  if (isNaN(price) || price < 1 || (Math.floor(price) !== price)) return alert('Invalid price.');
  
  let speed = Number(prompt('What speed?'));
  if (isNaN(speed) || speed < 150 || (Math.floor(speed) !== speed)) return alert('Invalid speed. Speed should be above or at 150.');
  
  let count = 0;
  
  let interval = setInterval(() => {
    if (count >= amt) return clearInterval(interval);
    
    blacket.requests.post(`/worker/bazaar/list`, {
      item,
      price
    }, (t) => {
      if (t.error) return console.log(`Error listing: ${t.reason}`);
      count++;
      console.log(`Listed 1x ${item}!`);
    });
  }, speed);
})();
