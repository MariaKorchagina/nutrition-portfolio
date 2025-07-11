document.getElementById('kzhbu-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value, 10);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    // Формула Харриса-Бенедикта для расчета базового обмена веществ (BMR)
    let bmr;
    if (gender === 'male') {
        bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
        bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }
    let calories = bmr * activity;
    // Корректировка по цели
    if (goal === 'lose') calories -= 300;
    if (goal === 'gain') calories += 300;
    calories = Math.round(calories);
    // Белки: 1.5 г на 1 кг веса, Жиры: 1 г на 1 кг веса, Углеводы: остаток калорий
    const protein = Math.round(weight * 1.5); // г
    const fat = Math.round(weight * 1); // г
    const protein_kcal = protein * 4;
    const fat_kcal = fat * 9;
    const carbs = Math.round((calories - protein_kcal - fat_kcal) / 4); // г

    let rec = '';
    if (goal === 'lose') rec = 'Рекомендуется создать небольшой дефицит калорий для безопасного похудения.';
    if (goal === 'gain') rec = 'Рекомендуется создать небольшой профицит калорий для набора массы.';
    if (goal === 'maintain') rec = 'Рекомендуется поддерживать текущий уровень калорий.';

    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <strong>Ваши суточные нормы:</strong><br>
        Калории: <b>${calories}</b> ккал<br>
        Белки: <b>${protein}</b> г<br>
        Жиры: <b>${fat}</b> г<br>
        Углеводы: <b>${carbs}</b> г<br><br>
        <em>${rec}</em>
    `;
});