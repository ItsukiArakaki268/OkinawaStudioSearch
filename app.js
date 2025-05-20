// グローバル変数
let studios = [];

// 要素を取得
const submit = document.getElementById("submit");
const people = document.getElementById("people");
const startTime = document.getElementById("start-time");
const endTime = document.getElementById("end-time");

// ページが読み込まれた時の処理
document.addEventListener("DOMContentLoaded", async () => {
    await loadStudios();
})

// 決定ボタンが押された時の処理
submit.addEventListener("click", () => {
    console.log(people.value);
    console.log(startTime.value);
    console.log(endTime.value);

    // スタジオ検索の実行
    const results = searchStudios(people.value, startTime.value, endTime.value);
    // 検索結果の表示
    displayResults(results);
} )

// JSONファイルの読み込み
async function loadStudios() {
    try {
        const response = await fetch("./studios.json");
        const data = await response.json();
        studios = data.studios;
        console.log(studios);
    } catch (error) {
        console.log("スタジオデータの読み込みに失敗しました:", error);
    }
}

// スタジオ検索
function searchStudios(people, startTime, endTime) {
    return studios.filter((studio) => {
        // 営業時間外の場合は除外
        if (startTime < studio.businessHours.open || startTime > studio.businessHours.close || endTime < studio.businessHours.open || endTime > studio.businessHours.close) {
            return false;
        }
        // // 人数がmaxMembersを超える場合は除外
        // if (people > studio.maxMembers) return false;
        return true;
    })
}

// 検索結果の表示
function displayResults(results) {
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = "";

    results.forEach(studio => {
        const studioElement = document.createElement("div");
        studioElement.className = "studio-card";

        // スタジオ名を表示
        studioElement.innerHTML = `<h3>${studio.name}</h3>`;

        const availableRooms = studio.room.filter(room => {
            return Number(people.value) <= room.maxMembers;
        })

        availableRooms.forEach(room => {
            const roomElement = document.createElement("div");
            roomElement.className = "room-info";
            roomElement.innerHTML = `
                <p>ルーム名: ${room.name}</p>
                <p>料金: ${room.price}円</p>
                <p>最大人数: ${room.maxMembers}人</p>
            `;
            studioElement.appendChild(roomElement);
        });

        resultsContainer.appendChild(studioElement);
    });
}