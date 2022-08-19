const readline = require('readline')
const { stdin: input, stdout: output } = require('process');
const { userInfo } = require('os');
const rl = readline.createInterface({ input, output });

const userData = [
    {
        name: "rashmi",
        amount: 1300,
        place:"Mumbai",
        phone:"9876543210"
    },
    {
        name: "sonia",
        amount: 3000,
        place:"Mumbai",
        phone:"9876543201"
    },
    {
        name: "jaya",
        amount: 7590,
        place:"Mumbai",
        phone:"9876543120"
    },
   {
        name: "abc",
        amount: 7800,
        place:"Mumbai",
        phone:"9876541120"
    },
]

const services = ["user", "create account"];

const userInfos = (user) => 
  {
    rl.question('Enter Username \n ', username => 
      {
        user(username)
    })
}

const debit=(userPersonalInfo)=>
  {
    rl.question("Enter amount to Debit  \n", (deb) => 
      {
        if (deb > userPersonalInfo[0].amount) 
        {
            console.log("\n Insufficient balance! \n")
            debit(userPersonalInfo)
        }
        else
        {
          userPersonalInfo[0].amount=userPersonalInfo[0].amount -deb;
            console.log(`\n amout of Rs ${deb} is debited from your account \n remaining balance : Rs ${userPersonalInfo[0].amount}  \n `)
            console.table(userPersonalInfo)
            console.log("\n Thanks for visiting our Sahkar Bank \n ")
            rl.close()
        }
    })
}

const credit=(userPersonalInfo)=>
  {
    rl.question("enter the amount to be credited \n",(amt)=>
    {
        userPersonalInfo[0].amount=userPersonalInfo[0].amount + Number(amt);
        console.log(`\n amout of Rs ${amt} is credited into your account \n new  balance : Rs ${userPersonalInfo[0].amount}
        \n`)
        console.table(userPersonalInfo)
        
        console.log("\n Thanks for visiting sahkar Bank \n")
        rl.close()
    })
}

const debcred = (userPersonalInfo) => {
    (() => {
        console.table(userPersonalInfo)
        rl.question("do you want to Debit/Credit amount y/n \n",
            answer => {
                if (answer == 'y') {
                    rl.question("1 for Debit , 2 for credit \n", answer => {
                        if (answer == 1) {
                            debit(userPersonalInfo)
                        }
                        else if (answer == 2) {
                            credit(userPersonalInfo)
                        }
                        else {
                            console.log("please select correct option !! \n")
                            debcred(userPersonalInfo)
                        }
                    })
                }
                else
                    rl.close()
            })
    })()
}

const createUser=(usr)=>{
    rl.question("what is your name \n",(username)=>{
        rl.question("amount you want to add \n",(amt)=>{
            rl.question("where do you live? \n",(place)=>{
                rl.question("phone number \n",(phone)=>{
                    let data={"name":nam,"amount":Number(amt),"place":place,"phone":phone}
                    usr(data)
                })
            })
        })
    })
}

const serviceOpt = () => {
      rl.question("WElCOME TO SAHKAR BANK. please Choose from  the following Services \n", (ser) => {
        if (ser == 0) {
            userInfos(user => {
                let i = 0;
                const userPersonalInfo = userData.filter(item => {
                    return item.name == user;
                })

                userPersonalInfo.length >= 1 ? debcred(userPersonalInfo):(() => {
                        console.log("user not found \n")
                        rl.close();
                    })();
            })
        }
        else if (ser == 1) {
            createUser(usr=>
                {userData.push(usr)
                console.log("\n \n user has been added \n \n ")
                    console.table(userData)
                console.log("thanks for visiting Sahkar bank")
                rl.close()})
                
        } else {
            console.log("please choose correct option \n")
            serviceOpt();
        }
    })
    console.table(services)
}
const sahkarBank = () => {
    serviceOpt()
}
sahkarBank();