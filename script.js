const searchSports = async () => {
    const searchInput = document.getElementById("search-input");
    if(searchInput.value != ""){
        const res = await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchInput.value}`)
        const data = await res.json();
        displaySearchResult(data.teams);
        const sportDetailId = document.getElementById("sport-details");
        sportDetailId.textContent="";
    }else if(searchInput.value == ""){
        const searchResult = document.getElementById("search-result")
        searchResult.textContent = "No result Found";
        searchResult.style.margin="auto";
    }
    searchInput.value="";
}
const displaySearchResult = teams =>{
    const searchResult = document.getElementById("search-result")
    searchResult.textContent = "";
    teams.forEach(team => {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col");
        colDiv.innerHTML=`
            <div class="col">
                <div class="card h-100 rounded-3 p-3 shadow-sm">
                    <img src="${team.strTeamBadge}" class="card-img-top rounded-3 shadow-sm" alt="team">
                    <div class="card-body">
                        <h3 class="card-title text-center text-info">${team.strTeam}</h3>
                        <p class="card-text">${team.strDescriptionEN.slice(0,33)}...</p>
                    </div>
                    <a onclick = "mealDetails(${team.idTeam})" class="btn btn-info text-white" target="_blank">Details</a>
                </div>
            </div>
        `;
        searchResult.appendChild(colDiv)
    });
}
const mealDetails = async (mealId) => {
    const res = await fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${mealId}`)
        const data = await res.json(); 
        DisplaySportDetails(data.teams[0]);
}
const DisplaySportDetails = team => {
    const sportDetailId = document.getElementById("sport-details");
    sportDetailId.textContent="";
    const cardDiv = document.createElement('div');
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
        <div class="row g-0 shadow-sm">
            <div class="col-md-4">
                <img src="${team.strTeamBadge}" alt="team" class="img-fluid rounded-start shadow-sm">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h3 class="card-title">${team.strTeam}</h3>
                    <p class="card-text">${team.strDescriptionEN.slice(0,800)}</p>
                    <a href="${team.strYoutube}" class="btn btn-info text-white" target="_blank">Go to Youtube</a>
                </div>
            </div>
        </div>
    `;
    sportDetailId.appendChild(cardDiv)
}