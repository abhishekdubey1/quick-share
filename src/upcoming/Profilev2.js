import React from "react";

const Profile = () => {
  return (
    <main>
      <div className="profile">
        <header className="profile-head">
          <div></div>
          <section>
            <div></div>
            <ul>
              <li>
                <span className="">
                  <span className="">11</span> posts
                </span>
              </li>
              <li>
                <a href="/">
                  <span className="" title="">
                    148
                  </span>
                  followers
                </a>
              </li>
              <li>
                <a href="/">
                  <span className="" title="">
                    148
                  </span>
                  followers
                </a>
              </li>
            </ul>
            <div>
              <h1>Abhishek Dubey</h1>
              <br />
              <span>
                Talk to me about tech, mystery, or anything that you find
                fascinating
              </span>
            </div>
          </section>
        </header>
      </div>
    </main>
  );
};

export default Profile;

/*

const fn1 = s => s.toLowerCase();
const fn2 = s => s.split('').reverse().join('');
const fn3 = s => s + '!'

const newFunc = pipe(fn1, fn2, fn3);
const result = newFunc('Time'); // emit!

$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

function getSum(responseFn, a){
  setTimeout(()=>{
    responseFn(a+10)
  },1000)
}

function getSum100(responseFn, a){
  setTimeout(()=>{
    responseFn(a+100)
  },1000)
}

getSum((a) => getSum100((b) => console.log(b),a),10)

//  input + 10
// getSum(fn, 10)
// getSum100( fn1,getSum(fn, 10))



*/