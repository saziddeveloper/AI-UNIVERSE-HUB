let displayedCount = 6; // Number of cards to display initially
let isSortedByDate = false; // Flag to check if sorting is applied
let aies = []; // Store fetched AI tools

const loadPhone = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    aies = data.data.tools;
    displayAI(aies);
};

const displayAI = (aies) => {
    const aiContainer = document.getElementById("ai-contianer");
    aiContainer.innerHTML = ''; // Clear the container before rendering

    let toolsToDisplay = aies.slice(0, displayedCount);
    if (isSortedByDate) {
        toolsToDisplay = toolsToDisplay.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
    }

    toolsToDisplay.forEach(ai => {
        const aiCard = document.createElement("div");
        aiCard.classList = `w-[311px] md:w-[340px] lg:w-[415px] h-[507px] md:h-[520px] lg:h-[565px] rounded-xl border p-5`;
        aiCard.innerHTML = `
        <img src="${ai.image}" alt="Not Found!">
        <h2 class="mt-6 font-semibold text-[25px] text-[#111111]">Features</h2>
        <ul class="mt-3">
            <li class="text-[#585858]">1. <span>${ai.features[0]}</span></li>
            <li class="text-[#585858]">2. <span>${ai.features[1]}</span></li>
            <li class="text-[#585858]">3. <span>${ai.features[2]}</span></li>
        </ul>
        <div class="my-7 rounded-lg h-[2px] bg-[#1111111c]"></div>
        <div class="flex justify-between">
            <aside class="flex flex-col gap-3">
                <h2 class="font-semibold text-[25px] text-[#111111]">${ai.name}</h2>
                <div class="flex gap-2 ml-[1px]">
                    <i class="bi bi-calendar-week"></i>
                    <p class="font-medium text-[#585858] mt-[1px]">${ai.published_in}</p>
                </div>
            </aside>
            <aside class="flex items-center">
                <button onclick="handleShowDetails('${ai.id}')" class="hover:opacity-90 active:opacity-60"><i class="bi bi-arrow-right-circle-fill text-4xl text-[#EB5757]"></i></button>
            </aside>
        </div>`;
        aiContainer.appendChild(aiCard);
    });

    toggleLoadingSpinner(false);
};

const seeMore = () => {
    displayedCount = Infinity; // Set to a large number to display all cards
    displayAI(aies); // Reload to display all cards
};

const sortByDate = () => {
    isSortedByDate = true; // Enable sorting by date
    displayAI(aies); // Reload to display sorted cards
};

const handleShowDetails = async (inputAIid) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${inputAIid}`);
    const data = await res.json();
    const aiDetails = data.data;
    showPhoneDetails(aiDetails);
};

const showPhoneDetails = (inputAIDetails) => {
    const modalContainer = document.getElementById("ai_details_modal");
    const aiCard = document.createElement("div");
    aiCard.classList = `modal-box w-[340px] md:w-[490px] lg:w-[920px] max-w-5xl rounded-xl p-0`;
    aiCard.innerHTML = `
    <form method="dialog">
        <button class="absolute bg-[#EB5757] text-white w-12 h-12 text-[20px] btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
    </form>
    <div class="p-2 md:px-12 lg:px-16 md:py-8 lg:py-8 flex flex-col-reverse lg:flex-row justify-between gap-4 md:gap-8 lg:gap-4">
        <aside class="border border-[#EB5757] bg-[#eb57570a] rounded-xl w-[323px] md:w-96 lg:w-96 h-[475px] md:h-[460px] lg:h-[460px] p-4">
            <h1 class="font-semibold text-[15px] text-[#111111]">${inputAIDetails.description}</h1>
            <div class="flex gap-4 my-5">
                <aside class="bg-[#FFFFFF] rounded-xl w-28 h-28 flex justify-center items-center">
                    <h3 class="font-bold text-[#03A30A] text-center">$10/<br>month<br>Basic</h3>
                </aside>
                <aside class="bg-[#FFFFFF] rounded-xl w-28 h-28 flex justify-center items-center">
                    <h3 class="font-bold text-[#F28927] text-center">$50/<br>month<br>Pro</h3>
                </aside>
                <aside class="bg-[#FFFFFF] rounded-xl w-28 h-28 flex justify-center items-center">
                    <h3 class="font-bold text-[#EB5757] text-center">Contact<br>us<br>Enterprise</h3>
                </aside>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <aside>
                    <h2 class="font-semibold text-[20px] text-[#111111]">Features</h2>
                    <ul class="mt-3">
                        <li class="text-[#585858] text-[15px]">• <span>${inputAIDetails.features["1"].feature_name}</span></li>
                        <li class="text-[#585858] text-[15px]">• <span>${inputAIDetails.features["2"].feature_name}</span></li>
                        <li class="text-[#585858] text-[15px]">• <span>${inputAIDetails.features["3"].feature_name}</span></li>
                    </ul>
                </aside>
                <aside>
                    <h2 class="font-semibold text-[20px] text-[#111111]">Integrations</h2>
                    <ul class="mt-3">
                        <li class="text-[#585858] text-[15px]">• <span>${inputAIDetails.integrations[0]}</span></li>
                        <li class="text-[#585858] text-[15px]">• <span>${inputAIDetails.integrations[1]}</span></li>
                        <li class="text-[#585858] text-[15px]">• <span>${inputAIDetails.integrations[2]}</span></li>
                    </ul>
                </aside>
            </div>
        </aside>
        <aside class="border rounded-xl w-[323px] md:w-96 lg:w-96 h-[460px] md:h-[500px] lg:h-[460px] p-4">
            <img src="${inputAIDetails.image_link[0]}" alt="Not Found!">
            <div class="flex flex-col items-center">
                <h2 class="mt-14 lg:mt-8 text-center font-semibold text-[20px] text-[#111111]">${inputAIDetails.input_output_examples[0].input}</h2>
                <p class="mt-7 lg:mt-4 w-[300px] text-[11px] text-[#585858] text-center">${inputAIDetails.input_output_examples[0].output}</p>
            </div>
        </aside>
    </div>`;
    modalContainer.appendChild(aiCard);
    ai_details_modal.showModal();
};

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loader");
    if (!isLoading){
        loadingSpinner.classList.add("hidden");
    }
};

toggleLoadingSpinner(true);
loadPhone();


/* let displayedCount = 6; // Number of cards to display initially

const loadPhone = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    const aies = data.data.tools;
    displayAI(aies);
};

const displayAI = (aies) => {
    const aiContainer = document.getElementById("ai-contianer");
    aiContainer.innerHTML = ''; // Clear the container before rendering

    aies.slice(0, displayedCount).forEach(ai => {
        const aiCard = document.createElement("div");
        aiCard.classList = `w-[311px] md:w-[340px] lg:w-[415px] h-[507px] md:h-[520px] lg:h-[565px] rounded-xl border p-5`;
        aiCard.innerHTML = `
        <img src="${ai.image}" alt="Not Found!">
        <h2 class="mt-6 font-semibold text-[25px] text-[#111111]">Features</h2>
        <ul class="mt-3">
            <li class="text-[#585858]">1. <span>${ai.features[0]}</span></li>
            <li class="text-[#585858]">2. <span>${ai.features[1]}</span></li>
            <li class="text-[#585858]">3. <span>${ai.features[2]}</span></li>
        </ul>
        <div class="my-7 rounded-lg h-[2px] bg-[#1111111c]"></div>
        <div class="flex justify-between">
            <aside class="flex flex-col gap-3">
                <h2 class="font-semibold text-[25px] text-[#111111]">${ai.name}</h2>
                <div class="flex gap-2 ml-[1px]">
                    <i class="bi bi-calendar-week"></i>
                    <p class="font-medium text-[#585858] mt-[1px]">${ai.published_in}</p>
                </div>
            </aside>
            <aside class="flex items-center">
                <button onclick="handleShowDetails('${ai.id}')" class="hover:opacity-90 active:opacity-60"><i class="bi bi-arrow-right-circle-fill text-4xl text-[#EB5757]"></i></button>
            </aside>
        </div>`;
        aiContainer.appendChild(aiCard);
    });
    toggleLoadingSpinner(false);
};

const seeMore = () => {
    displayedCount = Infinity; // Set to a large number to display all cards
    loadPhone(); // Reload to display all cards
};

const handleShowDetails = async (inputAIid) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${inputAIid}`);
    const data = await res.json();
    const aiDetails = data.data;
    showPhoneDetails(aiDetails);
};

// Show Details Functionality
const showPhoneDetails = (inputAIDetails) => {
    const modalContainer = document.getElementById("ai_details_modal");
    const aiCard = document.createElement("div");
    aiCard.classList = `modal-box w-[340px] md:w-[490px] lg:w-[920px] max-w-5xl rounded-xl p-0`;
    aiCard.innerHTML = `
    <form method="dialog">
        <button class="absolute bg-[#EB5757] text-white w-12 h-12 text-[20px] btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
    </form>
    <div class="p-2 md:px-12 lg:px-16 md:py-8 lg:py-8 flex flex-col-reverse lg:flex-row justify-between gap-4 md:gap-8 lg:gap-4">
        <aside class="border border-[#EB5757] bg-[#eb57570a] rounded-xl w-[323px] md:w-96 lg:w-96 h-[475px] md:h-[460px] lg:h-[460px] p-4">
            <h1 class="font-semibold text-[15px] text-[#111111]">${inputAIDetails.description}</h1>
            <div class="flex gap-4 my-5">
                <aside class="bg-[#FFFFFF] rounded-xl w-28 h-28 flex justify-center items-center">
                    <h3 class="font-bold text-[#03A30A] text-center">$10/<br>month<br>Basic</h3>
                </aside>
                <aside class="bg-[#FFFFFF] rounded-xl w-28 h-28 flex justify-center items-center">
                    <h3 class="font-bold text-[#F28927] text-center">$50/<br>month<br>Pro</h3>
                </aside>
                <aside class="bg-[#FFFFFF] rounded-xl w-28 h-28 flex justify-center items-center">
                    <h3 class="font-bold text-[#EB5757] text-center">Contact<br>us<br>Enterprise</h3>
                </aside>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <aside>
                    <h2 class="font-semibold text-[20px] text-[#111111]">Features</h2>
                    <ul class="mt-3">
                        <li class="text-[#585858] text-[15px]">• <span>${inputAIDetails.features["1"].feature_name}</span></li>
                        <li class="text-[#585858] text-[15px]">• <span>${inputAIDetails.features["2"].feature_name}</span></li>
                        <li class="text-[#585858] text-[15px]">• <span>${inputAIDetails.features["3"].feature_name}</span></li>
                    </ul>
                </aside>
                <aside>
                    <h2 class="font-semibold text-[20px] text-[#111111]">Integrations</h2>
                    <ul class="mt-3">
                        <li class="text-[#585858] text-[15px]">• <span>${inputAIDetails.integrations[0]}</span></li>
                        <li class="text-[#585858] text-[15px]">• <span>${inputAIDetails.integrations[1]}</span></li>
                        <li class="text-[#585858] text-[15px]">• <span>${inputAIDetails.integrations[2]}</span></li>
                    </ul>
                </aside>
            </div>
        </aside>
        <aside class="border rounded-xl w-[323px] md:w-96 lg:w-96 h-[460px] md:h-[500px] lg:h-[460px] p-4">
            <img src="${inputAIDetails.image_link[0]}" alt="Not Found!">
            <div class="flex flex-col items-center">
                <h2 class="mt-14 lg:mt-8 text-center font-semibold text-[20px] text-[#111111]">${inputAIDetails.input_output_examples[0].input}</h2>
                <p class="mt-7 lg:mt-4 w-[300px] text-[11px] text-[#585858] text-center">${inputAIDetails.input_output_examples[0].output}</p>
            </div>
        </aside>
    </div>`;
    modalContainer.appendChild(aiCard);
    ai_details_modal.showModal();
};

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loader");
    if (!isLoading){
        loadingSpinner.classList.add("hidden");
    }
};

toggleLoadingSpinner(true);
loadPhone(); */
