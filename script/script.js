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
const main = document.getElementById('main');
const hiddenDiv = document.getElementById('hidden-section');


function countCalculation(){
    total.innerText = jobsDiv.children.length;
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


    if(id === 'interview-button'){
        jobsDiv.classList.add('hidden');
        hiddenDiv.classList.remove('hidden');
    }
    else if(id === 'rejected-button'){
        jobsDiv.classList.add('hidden');
        hiddenDiv.classList.remove('hidden');
    }
    else if(id === 'ALL-btn'){
        jobsDiv.classList.remove('hidden');
        hiddenDiv.classList.add('hidden');
    }
        
}


main.addEventListener('click',function(event){
    if(event.target.classList.contains('interview')){
        const parent = event.target.parentNode.parentNode;
        const companyName = parent.querySelector('.company-name').innerText
        const jobPosition = parenNode.querySelector('.job-positon').innerText
        const jobType = parenNode.querySelector('.job-type').innerText
        const appliedStatus = parenNode.querySelector('.applied-status').innerText
        const jobDescription = parenNode.querySelector('.job-description').innerText

        parent.querySelector('.appliedStatus').innerText = 'Interview';

        const jobInfo = {
            companyName,
            jobType,
            jobPosition,
            appliedStatus : 'Interview',
            jobDescription
        }

        const existingJobs = interviewList.find(item => item.companyName == cardInfo.companyName)

        if(!existingJobs){
            interviewList.push(jobInfo)
        }

        rejectedList = rejectedList.filter(item => item.companyName != jobInfo.companyName)

        // if(currentStatus == 'rejected'){

        // }

        countCalculation();
    }
    else if(event.target.classList.contains('rejected')){
        const parent = event.target.parentNode.parentNode;
        const companyName = parent.querySelector('.company-name').innerText
        const jobPosition = parenNode.querySelector('.job-positon').innerText
        const jobType = parenNode.querySelector('.job-type').innerText
        const appliedStatus = parenNode.querySelector('.applied-status').innerText
        const jobDescription = parenNode.querySelector('.job-description').innerText

        parent.querySelector('.appliedStatus').innerText = 'Rejected';

        const jobInfo = {
            companyName,
            jobType,
            jobPosition,
            appliedStatus : 'Rejected',
            jobDescription
        }

        const existingJobs = rejectedList.find(item => item.companyName == jobInfo.companyName)

        if(!existingJobs){
            rejectedList.push(jobInfo)
        }

        interviewList = interviewList.filter(item => item.companyName != jobInfo.companyName)

        // if(currentStatus == 'interview'){

        // }

        countCalculation();
    }
})





































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


