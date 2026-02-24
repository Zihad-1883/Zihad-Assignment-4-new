let interviewList = [];
let rejectedList = [];
let currentStatus = 'all'; 

let total = document.getElementById('total');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const allFilterBtn = document.getElementById('ALL-btn');
const interviewFilterBtn = document.getElementById('interview-button');
const rejectedFilterBtn = document.getElementById('rejected-button');

const jobsDiv = document.getElementById('jobs-div');
const main = document.getElementById('main-section');
const hiddenDiv = document.getElementById('hidden-section');


function countCalculation(){
    total.innerText = jobsDiv.children.length;
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length
}

countCalculation();

function toggleStyle(id){
    allFilterBtn.classList.add('text-[#64748bFF]', 'bg-white', 'border-none', 'shadow-sm');
    interviewFilterBtn.classList.add('text-[#64748bFF]', 'bg-white', 'border-none', 'shadow-sm');
    rejectedFilterBtn.classList.add('text-[#64748bFF]', 'bg-white', 'border-none', 'shadow-sm');

    allFilterBtn.classList.remove('bg-blue-500','text-white');
    interviewFilterBtn.classList.remove('bg-blue-500','text-white');
    rejectedFilterBtn.classList.remove('bg-blue-500','text-white');

    // console.log(id);

    const clicked = document.getElementById(id);

    currentStatus = id;
    // console.log(currentStatus);
    // console.log(clicked);

    clicked.classList.remove('text-[#64748bFF]', 'bg-white', 'border-none', 'shadow-sm');
    clicked.classList.add('bg-blue-500','text-white'); 


    if(id === 'interview-button'){
        jobsDiv.classList.add('hidden');
        hiddenDiv.classList.remove('hidden');
        renderInterview()
    }
    else if(id === 'rejected-button'){
        jobsDiv.classList.add('hidden');
        hiddenDiv.classList.remove('hidden');
        renderRejected()
    }
    else if(id === 'ALL-btn'){
        jobsDiv.classList.remove('hidden');
        hiddenDiv.classList.add('hidden');
    }
        
}


main.addEventListener('click',function(event){
    if(event.target.classList.contains('interview')){
        // const parent = event.target.parentNode.parentNode;
        const parent = event.target.closest('.job-card')
        const companyName = parent.querySelector('.company-name').innerText
        const jobPosition = parent.querySelector('.job-positon').innerText
        const jobType = parent.querySelector('.job-type').innerText
        const appliedStatus = parent.querySelector('.applied-status')
        const jobDescription = parent.querySelector('.job-description').innerText

        appliedStatus.innerText = 'INTERVIEW';
        appliedStatus.parentElement.style.backgroundColor = '#eef4ff'

        const jobInfo = {
            companyName,
            jobType,
            jobPosition,
            appliedStatus : 'INTERVIEW',
            jobDescription
        }

        const existingJobs = interviewList.find(item => item.companyName == jobInfo.companyName)

        if(!existingJobs){
            interviewList.push(jobInfo)
        }

        rejectedList = rejectedList.filter(item => item.companyName != jobInfo.companyName)

        if(currentStatus === 'rejected-button'){
            renderRejected()
        }
        else if(currentStatus === 'interview-button'){
            renderInterview()
        }

        countCalculation();
    }

    else if(event.target.classList.contains('rejected')){
        const parent = event.target.closest('.job-card')
        const companyName = parent.querySelector('.company-name').innerText
        const jobPosition = parent.querySelector('.job-positon').innerText
        const jobType = parent.querySelector('.job-type').innerText
        const appliedStatus = parent.querySelector('.applied-status')
        const jobDescription = parent.querySelector('.job-description').innerText

       appliedStatus.innerText = 'REJECTED';
       appliedStatus.parentElement.style.backgroundColor = '#fee2e2';

        const jobInfo = {
            companyName,
            jobType,
            jobPosition,
            appliedStatus : 'REJECTED',
            jobDescription
        }

        const existingJobs = rejectedList.find(item => item.companyName == jobInfo.companyName)

        if(!existingJobs){
            rejectedList.push(jobInfo)
        }

        interviewList = interviewList.filter(item => item.companyName != jobInfo.companyName)

        if(currentStatus === 'interview-button'){
            renderInterview()
        }
        else if(currentStatus === 'rejected-button'){
            renderRejected()
        }

        countCalculation();
    }
})


document.addEventListener('click',function(event){
    if(event.target.closest('.delet')){
        const deletBtn = event.target.closest('.delet')
        const parent = deletBtn.closest('.job-card')
        const companyName = parent.querySelector('.company-name').innerText;

        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName)

        parent.remove();

        if(currentStatus === 'interview-button'){
            renderInterview()
        }
        else if(currentStatus === 'rejected-button'){
            renderRejected()
        }
        countCalculation()
    }
})


function renderInterview(){
    hiddenDiv.innerHTML = ''

    if(interviewList.length === 0){
        hiddenDiv.innerHTML = `
            <div class="bg-white flex px-32 py-12 text-center lg:flex flex-col justify-center items-center lg:px-60 lg:py-28 rounded-md container mx-auto gap-5">
                <div>
                    <img class="lg:mb-10" src="./B13-A4-PH-Job-Tracker/jobs.png" alt="">
                </div>
                <div>
                    <h4 class="text-2xl font-bold mb-1">No interviews scheduled</h4>
                    <p class="text-[#64748bFF]">Mark jobs as Interview to see them here</p>
                </div>
            </div>
        `;
        return;
    }

    for(let interviews of interviewList){
        // console.log(interviews)
        let div = document.createElement('div')
        div.className = 'job-card p-6 bg-white rounded-md mb-4'
        div.innerHTML = `
        <div class="flex justify-between items-center mb-5">
                <div>
                    <h2 class="company-name text-[18px] font-semibold mb-1">${interviews.companyName}</h2>
                    <h3 class="job-positon opacity-80">${interviews.jobPosition}</h3>
                </div>
                <div class="delet">
                    <img src="./B13-A4-PH-Job-Tracker/Trash.png" alt="">
                </div>
            </div>
            <!-- rest elements -->
             <p class="job-type text-[14px] opacity-80 mb-5">${interviews.jobType}</p>
             <div class="bg-[#eef4ffFF] max-w-[113px] min-h-[35px] flex items-center justify-center rounded-md mb-4">
                <h5 class="applied-status text-[14px] font-medium px-3 py-2">${interviews.appliedStatus}</h5>
             </div>
             <p class="job-description text-[14px] text-[#323b49FF] mb-5">${interviews.jobDescription}</p>
             <div class="grid grid-cols-1 sm:flex gap-2">
                 <button class="interview btn btn-outline px-5 py-3 text-green-500 text-[14px] font-semibold">INTERVIEW</button>
                 <button class="rejected btn btn-outline px-5 py-3 text-red-500 text-[14px] font-semibold">REJECTED</button>
             </div>
        `
        hiddenDiv.appendChild(div)
    }
}

function renderRejected(){
       hiddenDiv.innerHTML = ''

       if(rejectedList.length === 0){
        hiddenDiv.innerHTML = `
            <div class="bg-white flex px-32 py-12 text-center lg:flex flex-col justify-center items-center lg:px-60 lg:py-28 rounded-md container mx-auto gap-5">
                <div>
                    <img class="lg:mb-10" src="./B13-A4-PH-Job-Tracker/jobs.png" alt="">
                </div>
                <div>
                    <h4 class="text-2xl font-bold mb-1">No interviews scheduled</h4>
                    <p class="text-[#64748bFF]">Mark jobs as Interview to see them here</p>
                </div>
            </div>
        `;
        return;
       }

    for(let reject of rejectedList){
        // console.log(interviews)
        let div = document.createElement('div')
        div.className = 'job-card p-6 bg-white rounded-md mb-4'
        div.innerHTML = `
        <div class="flex justify-between items-center mb-5">
                <div>
                    <h2 class="company-name text-[18px] font-semibold mb-1">${reject.companyName}</h2>
                    <h3 class="job-positon opacity-80">${reject.jobPosition}</h3>
                </div>
                <div class="delet">
                    <img src="./B13-A4-PH-Job-Tracker/Trash.png" alt="">
                </div>
            </div>
            <!-- rest elements -->
             <p class="job-type text-[14px] opacity-80 mb-5">${reject.jobType}</p>
             <div class="bg-[#eef4ffFF] max-w-[113px] min-h-[35px] flex items-center justify-center rounded-md mb-4">
                <h5 class="applied-status text-[14px] font-medium px-3 py-2">${reject.appliedStatus}</h5>
             </div>
             <p class="job-description text-[14px] text-[#323b49FF] mb-5">${reject.jobDescription}</p>
             <div class="grid grid-cols-1 sm:flex gap-2">
                 <button class="interview btn btn-outline px-5 py-3 text-green-500 text-[14px] font-semibold">INTERVIEW</button>
                 <button class="rejected btn btn-outline px-5 py-3 text-red-500 text-[14px] font-semibold">REJECTED</button>
             </div>
        `
        hiddenDiv.appendChild(div)
    }
}




































// const allButton = document.getElementById('ALL-btn');
// const interviewButton = document.getElementById('interview-button');
// const rejectedButton = document.getElementById('rejected-button');
// const jobsDiv = document.getElementById('jobs-div');
// const hiddenDiv = document.getElementById('hidden-div');
// const jobCount = document.getElementById('job-count');
// const main = document.getElementById('main-section');

// // remove the active state from all buttons and add it to the clicked button
// function normal(button) {
//     [allButton, interviewButton, rejectedButton].forEach(b => {
//         b.classList.remove('bg-blue-500', 'text-white');
//         b.classList.add('text-[#64748bFF]', 'bg-white', 'border-none', 'shadow-sm');
//     });
//     button.classList.remove('text-[#64748bFF]', 'bg-white', 'border-none', 'shadow-sm');
//     button.classList.add('bg-blue-500', 'text-white');
// }

//     allButton.addEventListener('click', function () {
//         normal(allButton);
//         jobsDiv.classList.remove('hidden');
//         hiddenDiv.classList.add('hidden');
//         jobCount.innerText = '8 jobs';
//     });

//     interviewButton.addEventListener('click', function () {
//         normal(interviewButton);
//         jobsDiv.classList.add('hidden');
//         hiddenDiv.classList.remove('hidden');
//         jobCount.innerText = '0 jobs';
//     });

//     rejectedButton.addEventListener('click', function () {
//         normal(rejectedButton);
//         hiddenDiv.classList.remove('hidden');
//         jobsDiv.classList.add('hidden');
//         jobCount.innerText = '0 jobs';
// });

// document.querySelectorAll('.interview').forEach(button => {
//     button.addEventListener('click',function(event){
//         const jobCard = event.target.closest('.job-card');
//         const appliedStatus = jobCard.querySelector('.applied-status');

//         appliedStatus.innerText = 'INTERVIEW';
//         appliedStatus.classList.add('shadow-green-500', 'border', 'border-green-500', 'text-green-500', 'px-4', 'py-2');
//         appliedStatus.classList.remove('shadow-sm', 'border-none', 'text-[#64748bFF]');
//         jobCard.classList.add('border','border-green-500');

//         const jobsQuantity = document.getElementById('interview-jobs-quantity');
//         jobsQuantity.innerText = parseInt(jobsQuantity.innerText) + 1;

//         button.disabled = true;

//         interviewButton.addEventListener('click',function interview(){
//             const clickedJob = main.appendChild(jobCard);
//             clickedJob.classList.add('mt-4');
//             hiddenDiv.classList.add('hidden');
//         })
       
//         rejectedButton.addEventListener('click',function(){
//             main.removeChild(jobCard);
//             hiddenDiv.classList.remove('hidden');         
//         })
        
//     })

//         if(jobsDiv.childElementCount === 0){
//             hiddenDiv.classList.remove('hidden');
//         }

// });



// document.querySelectorAll('.rejected').forEach(button => {
//     button.addEventListener('click', function(event) {
//         const jobCard = event.target.closest('.job-card');
//         const appliedStatus = jobCard.querySelector('.applied-status');

//         appliedStatus.innerText = 'REJECTED';
//         appliedStatus.classList.add('shadow-red-500', 'border', 'border-red-500', 'text-red-500', 'px-5', 'py-2');
//         appliedStatus.classList.remove('shadow-sm', 'border-none', 'text-[#64748bFF]');
//         jobCard.classList.add('border','border-red-500');

//         const jobsQuantity = document.getElementById('rejected-jobs-quantity');
//         jobsQuantity.innerText = parseInt(jobsQuantity.innerText) + 1;

//         button.disabled = true;

//         rejectedButton.addEventListener('click',function interview(){
//             const clickedJob = main.appendChild(jobCard);
//             clickedJob.classList.add('mt-4');
//             hiddenDiv.classList.add('hidden');
//         })
            
//         interviewButton.addEventListener('click',function(){
//             main.removeChild(jobCard);
//             hiddenDiv.classList.remove('hidden');         
//         })

//         if(jobsDiv.childElementCount === 0){
//             hiddenDiv.classList.remove('hidden');
//         }
//     })

// }); 


