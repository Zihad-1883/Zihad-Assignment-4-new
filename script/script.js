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
    updateJobCount()
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
        updateJobCount()
    }
    else if(id === 'rejected-button'){
        jobsDiv.classList.add('hidden');
        hiddenDiv.classList.remove('hidden');
        renderRejected()
        updateJobCount()
    }
    else if(id === 'ALL-btn'){
        jobsDiv.classList.remove('hidden');
        hiddenDiv.classList.add('hidden');
        updateJobCount()
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
        updateJobCount()
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
        updateJobCount()
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


function updateJobCount() {
    const jobCountElement = document.getElementById('job-count');
    if(currentStatus === 'ALL-btn') {
        jobCountElement.innerText = jobsDiv.children.length + ' jobs';
    }
    else if(currentStatus === 'interview-button') {
        jobCountElement.innerText ='Jobs for interview : ' + interviewList.length
    }
    else if(currentStatus === 'rejected-button') {
        jobCountElement.innerText ='Rejected jobs : ' + rejectedList.length;
    }
}


