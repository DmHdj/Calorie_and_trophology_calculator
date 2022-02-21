'use strict';

window.addEventListener('DOMContentLoaded', () => {

    // Tabs
    const tabsParent = document.querySelector('.tabtoggler_wrapper'),
        tabs = tabsParent.querySelectorAll('.tabtoggler_item'),
        tabsContent = document.querySelectorAll('article');


    function hideTabContent () {
        tabsContent.forEach(item => {
            item.classList.remove('activ');
            item.classList.add('hide');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabtoggler_item_activ');
        });
    }

    function showTabsContent (i = 0) {
            tabsContent[i].classList.add('activ');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabtoggler_item_activ');
    }

    hideTabContent();
    showTabsContent();

    tabsParent.addEventListener('click', event => {
        if (event.target && event.target.classList.contains('tabtoggler_item')) {
            tabs.forEach((item, i) => {
                if (event.target === item) {
                    hideTabContent();
                    showTabsContent(i);
                }
            });
        }
    });

    // Adding input characteristics depending on gender

    const formTrophological = document.querySelector('.trophological_calc'),
        gendersTrophological = formTrophological.querySelectorAll('[data-gender]'),
        biceps = formTrophological.querySelector('[data-biceps]'),
        shoulder = formTrophological.querySelector('[data-shoulder]'),
        thigh = formTrophological.querySelector('[data-thigh]');
    
    function showAdditionalInputs () {
        biceps.classList.remove('hide');
        shoulder.classList.remove('hide');
        thigh.classList.remove('hide');

        biceps.classList.add('activ');
        shoulder.classList.add('activ');
        thigh.classList.add('activ'); 
    }

    function hideAdditionalInputs () {
        biceps.classList.remove('activ');
        shoulder.classList.remove('activ');
        thigh.classList.remove('activ');
        
        biceps.classList.add('hide');
        shoulder.classList.add('hide');
        thigh.classList.add('hide'); 
    }

    gendersTrophological.forEach(item => {
        item.addEventListener('click', event => {
            if (event.target.defaultValue === "female" && event.target.checked) {
                showAdditionalInputs();
            } else {
                hideAdditionalInputs();
            }
        });
    });

    // Calculation of proteins, fats, carbohydrates

    const formPfc = document.querySelector('.pfc_calc'),
        gendersPfc = formPfc.querySelectorAll('[data-gender="pfc"]'),
        heightPfcInput = formPfc.querySelector('#pfc_height'),
        weightPfcInput = formPfc.querySelector('#pfc_weight'),
        agePfcInput = formPfc.querySelector('#pfc_age'),
        btnPfc = formPfc.querySelector('#calculatePfc'),
        resetPfc = formPfc.querySelector('#resetPfc'),
        parentResultPfc = document.querySelector('.pfc_result'),
        weightFactorPfc = 10,
        heightFactorPfc = 6.25,
        ageFactorPfc = 5,
        maleFactorPfc = 5,
        femaleFactorPfc = 161,
        proteinPerKilogram = 1.5,
        fatPerKilogram = 1,
        caloriesPerGramProtein = 4,
        caloriesPerGramFat = 9, 
        caloriesPerGramCH = 4,
        resultPfc = {
            calories: 0,
            proteins: 0,
            fats: 0,
            carbohydrates: 0
        };
    // for modal
    const modal = document.querySelector('.modal'),
        btnModalClose = modal.querySelector('[data-close]');

    // Input with dot and numeric data type
    function getValueReplaceComma(input) {
        return parseFloat(input.value.replace(',', '.'));
    }

    let weightPfc, 
        heightPfc,
        agePfc;

    function definitionOfParametersPfc () {
        weightPfc = getValueReplaceComma(weightPfcInput),
        heightPfc = getValueReplaceComma(heightPfcInput),
        agePfc = getValueReplaceComma(agePfcInput);
    }

    // Calculation of calories, proteins, fats, carbohydrates
    function calculatePfc (gender) {
        if (gender === 'male') {
            resultPfc.calories = (weightFactorPfc * weightPfc) + (heightFactorPfc * heightPfc) - (ageFactorPfc * agePfc) + maleFactorPfc;        
        } else {
            resultPfc.calories = (weightFactorPfc * weightPfc) + (heightFactorPfc * heightPfc) - (ageFactorPfc * agePfc) - femaleFactorPfc;
        }

        resultPfc.proteins = proteinPerKilogram * weightPfc;

        resultPfc.fats = fatPerKilogram * weightPfc;

        resultPfc.carbohydrates = (resultPfc.calories - (resultPfc.proteins * caloriesPerGramProtein) - (resultPfc.fats * caloriesPerGramFat)) / caloriesPerGramCH;
    }

    // Result Output
    function printResultPfc () {
        let {calories, proteins, fats, carbohydrates} = resultPfc;

        parentResultPfc.innerHTML = '';

        parentResultPfc.innerHTML += `
            <li class="result_item">Калории: ${calories.toFixed(0)}</li>
            <li class="result_item">Белки: ${fats.toFixed(0)}</li>
            <li class="result_item">Жиры: ${proteins.toFixed(0)}</li>
            <li class="result_item">Углеводы: ${carbohydrates.toFixed(0)}</li>
        `;
    }

    function openModal () {
        modal.classList.toggle('activ');
        document.body.style.overflow = 'hidden';
    }

    function closeModal () {
        modal.classList.toggle('activ');
        document.body.style.overflow = '';  
    }

    // calculation initiation
    btnPfc.addEventListener('click', event => {
        event.preventDefault();

        const height = +heightPfcInput.value.replace(',', '.'), 
            weight = +weightPfcInput.value.replace(',', '.'),
            age = +agePfcInput.value.replace(',', '.');
        
        if ( heightPfcInput.value == '' || isNaN(height) || weightPfcInput.value == '' || isNaN(weight) || agePfcInput.value == '' || isNaN(age)) {
            openModal ();
        } else {
            definitionOfParametersPfc();

            gendersPfc.forEach(item => {
                if (item.defaultValue === "male" && item.checked) {
                    calculatePfc(item.defaultValue);
                } else if (item.defaultValue === "female" && item.checked) {
                    calculatePfc(item.defaultValue);
                }
            });

            
            printResultPfc();
        }
        
    });

    // Clear Results PFC
    resetPfc.addEventListener('click' , () => {
        parentResultPfc.innerHTML = '';
    });


    // close bodal
    btnModalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
        closeModal();       
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('activ')) {
        closeModal();
        }
    });
    // ---


    // calculation of human nutritional status
    const heightTrophInput = formTrophological.querySelector('#trophological_height'),
        weightTrophInput = formTrophological.querySelector('#trophological_weight'),
        bellyTrophInput = formTrophological.querySelector('#trophological_belly'),
        bicepsTrophInput = biceps.querySelector('#trophological_biceps'),
        shoulderTrophInput = shoulder.querySelector('#trophological_shoulder'),
        thighTrophInput = thigh.querySelector('#trophological_thigh'),
        neckTrophInput = formTrophological.querySelector('#trophological_neck'),
        btnTroph = formTrophological.querySelector('#calculateTroph'),
        resetTroph = formTrophological.querySelector('#resetTroph'),
        parentResultTroph = document.querySelector('.trophological_result'),
        factorForMale = {
            bodyWeight: 0.2,
            belly: 0.74,
            neck: 1.249,
            fatPercentFactor: 0.528
        },
        factorForFemale = {
            bodyWeight: 0.4,
            belly: 0.326,
            neck: 0.879,
            shoulder: 1.522,
            biceps: 1.051,
            thigh: 0.597,
            fatPercentFactor: 0.707
        },
        resultTroph = {
            bodyMassIndex: 0,
            recommendedBodyWeight: 0,
            deviationOfMass: 0,
            fatPercent: 0
        };

    // Input with dot and numeric data type
    let weightTroph,
        heightTroph,
        bellyTroph,
        bicepsTroph,
        neckTroph,
        shoulderTroph,
        thighTroph;

    function definitionOfParametersTroph () {
        weightTroph = getValueReplaceComma(weightTrophInput),
        heightTroph = getValueReplaceComma(heightTrophInput), 
        bellyTroph = getValueReplaceComma(bellyTrophInput), 
        bicepsTroph = getValueReplaceComma(bicepsTrophInput), 
        neckTroph = getValueReplaceComma(neckTrophInput), 
        shoulderTroph = getValueReplaceComma(shoulderTrophInput), 
        thighTroph = getValueReplaceComma(thighTrophInput);
    }

    // Calculation of body mass index
    function calcBodyMassIndex () {
        const massIndex = weightTroph / (heightTroph / 100) ** 2;

        resultTroph.bodyMassIndex = massIndex;

        if (massIndex > 20 && massIndex <= 25) {
            return `${massIndex.toFixed(1)} - Эйтрофия (нормальный)`;
        } else if (massIndex > 19  && massIndex <= 20) {
            return `${massIndex.toFixed(1)} - Пониженное питание`;
        } else if (massIndex > 17  && massIndex <= 19) {
            return `${massIndex.toFixed(1)} - Гипотрофия 1 стадии`;
        } else if (massIndex > 15  && massIndex <= 17) {
            return `${massIndex.toFixed(1)} - Гипотрофия 2 стадии`;
        } else if (massIndex > 25  && massIndex < 30) {
            return `${massIndex.toFixed(1)} - Повышенное питание`;
        } else if (massIndex >= 30  && massIndex < 35) {
            return `${massIndex.toFixed(1)} - Ожирение 1 стадии`;
        } else if (massIndex >= 35  && massIndex < 40) {
            return `${massIndex.toFixed(1)} - Ожирение 2 стадии`;
        } else if (massIndex >= 40) {
            return `${massIndex.toFixed(1)} - Ожирение 3 стадии`;
        } else {
            return `${massIndex.toFixed(1)} - Скорее всего, вы неверно ввели данные`;
        }
    }

    // calculation of recommended body weight
    function calcRecommendedBodyWeight (gender) {
        let recomBodyWeight;

        if (gender === 'male') {
            recomBodyWeight = (heightTroph - 100) - ((heightTroph - 152) * factorForMale.bodyWeight);
        } else {
            recomBodyWeight = (heightTroph - 100) - ((heightTroph - 152) * factorForFemale.bodyWeight);
        }

        resultTroph.recommendedBodyWeight = recomBodyWeight;
    }

    // calculation of the deviation of the actual weight from the recommended
    function calrDeviationOfMass (recomBodyWeight) {
        resultTroph.deviationOfMass = Math.round((weightTroph * 100) / recomBodyWeight);
    }

    // fat percentage calculation
    function culcFatPercent (gender) {
        if (gender === 'male') {
            let {belly, neck, fatPercentFactor} = factorForMale;

            resultTroph.fatPercent = ((belly * bellyTroph) - (neck * neckTroph)) + fatPercentFactor;
        } else {
            let {belly, neck, shoulder, biceps, thigh, fatPercentFactor} = factorForFemale;
        
            resultTroph.fatPercent = ((biceps * bicepsTroph) - (shoulder * shoulderTroph) - (neck * neckTroph) + (belly * bellyTroph) + (thigh * thighTroph)) + fatPercentFactor;
        }
    }

    // displaying the result of the calculation of trophological status on the screen
    function printResultTroph () {
        let {recommendedBodyWeight, deviationOfMass, fatPercent} = resultTroph;

        parentResultTroph.innerHTML = '';

        parentResultTroph.innerHTML += `
            <li class="result_item">Индекс массы тела: ${calcBodyMassIndex()}</li>
            <li class="result_item">Рекомендуемая масса тела: ${recommendedBodyWeight.toFixed(1)}</li>
            <li class="result_item">Отклонение фактической массы тела от рекомендуемой: ${deviationOfMass.toFixed(1)} %</li>
            <li class="result_item">Процент жира: ${fatPercent.toFixed(1)}</li>
        `;
    }

    // initialization of the calculation of the trophological status
    btnTroph.addEventListener('click', event => {
        event.preventDefault();

        const height = +heightTrophInput.value.replace(',', '.'), 
            weight = +weightTrophInput.value.replace(',', '.'),
            belly = +bellyTrophInput.value.replace(',', '.'),
            neck = +neckTrophInput.value.replace(',', '.'),
            biceps = +bicepsTrophInput.value.replace(',', '.'),
            shoulder = +shoulderTrophInput.value.replace(',', '.'),
            thigh = +thighTrophInput.value.replace(',', '.');

        gendersTrophological.forEach(item => {
            if (item.defaultValue === "male" && item.checked) {
                if ( heightTrophInput.value === '' || isNaN(height) || weightTrophInput.value === '' || isNaN(weight) || bellyTrophInput.value === '' || isNaN(belly) || neckTrophInput.value === '' || isNaN(neck)) {
                    openModal();
                } else {
                    definitionOfParametersTroph();

                    calcRecommendedBodyWeight(item.defaultValue);
        
                    culcFatPercent(item.defaultValue);

                    calrDeviationOfMass(resultTroph.recommendedBodyWeight);

                    printResultTroph();
                }
            
            } else if (item.defaultValue === "female" && item.checked) {
                if ( heightTrophInput.value == '' || isNaN(height) || weightTrophInput.value == '' || isNaN(weight) || bellyTrophInput.value == '' || isNaN(belly) || neckTrophInput.value === '' || isNaN(neck) || bicepsTrophInput.value === '' || isNaN(biceps) || shoulderTrophInput.value === '' || isNaN(shoulder) || thighTrophInput.value === '' || isNaN(thigh)) {
                    openModal();
                } else {
                    definitionOfParametersTroph();

                    calcRecommendedBodyWeight(item.defaultValue);

                    culcFatPercent(item.defaultValue);  

                    calrDeviationOfMass(resultTroph.recommendedBodyWeight);

                    printResultTroph();
                }
            }
        });
    });

    // Clear Results trophological status
    resetTroph.addEventListener('click' , () => {
        parentResultTroph.innerHTML = '';
    });

});





