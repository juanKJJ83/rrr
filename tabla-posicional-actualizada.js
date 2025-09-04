// Variables globales
let currentNumber = '';
let audioContext;
let isAudioEnabled = true;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeApp();
        setupEventListeners();
        initializeAudio();
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
});

// Inicializar la aplicación
function initializeApp() {
    const numberInput = document.getElementById('number-input');
    const visualExplanation = document.getElementById('visual-explanation');
    const helpPanel = document.getElementById('help-panel');
    
    // Ocultar paneles inicialmente
    if (visualExplanation) visualExplanation.style.display = 'none';
    if (helpPanel) helpPanel.style.display = 'none';
    
    // Limpiar tabla inicial
    clearTable();
}

// Configurar event listeners
function setupEventListeners() {
    const numberInput = document.getElementById('number-input');
    const clearBtn = document.getElementById('clear-btn');
    const randomBtn = document.getElementById('random-btn');
    const helpBtn = document.getElementById('help-btn');
    const creatorBtn = document.getElementById('creator-btn');
    const tiktokBtn = document.querySelector('.tiktok-educational-btn');
    const modal = document.getElementById('popup-modal');
    const closePopup = document.querySelector('.close-popup');
    
    // Input de número
    if (numberInput) {
        numberInput.addEventListener('input', handleNumberInput);
        numberInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                updateTable();
            }
        });
    }
    
    // Botones de control
    if (clearBtn) clearBtn.addEventListener('click', clearTable);
    if (randomBtn) randomBtn.addEventListener('click', generateRandomNumber);
    if (helpBtn) helpBtn.addEventListener('click', toggleHelp);
    
    // Botón educativo de TikTok
    if (tiktokBtn) {
        tiktokBtn.addEventListener('click', function() {
            playSound('success');
            // Agregar efecto de pulso
            tiktokBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                tiktokBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Modal
    if (creatorBtn && modal) {
        creatorBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            playSound('click');
        });
    }
    
    if (closePopup && modal) {
        closePopup.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Inicializar audio
function initializeAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Audio no disponible');
        isAudioEnabled = false;
    }
}

// Reproducir sonidos
function playSound(type) {
    if (!isAudioEnabled || !audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    let frequency;
    let duration;
    
    switch (type) {
        case 'click':
            frequency = 800;
            duration = 0.1;
            break;
        case 'success':
            frequency = 600;
            duration = 0.3;
            break;
        case 'clear':
            frequency = 400;
            duration = 0.2;
            break;
        default:
            frequency = 500;
            duration = 0.1;
    }
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Manejar entrada de número
function handleNumberInput(e) {
    try {
        let value = e.target.value;
        
        // Permitir solo números
        value = value.replace(/[^0-9]/g, '');
        
        // Limitar a 15 dígitos
        if (value.length > 15) {
            value = value.substring(0, 15);
        }
        
        e.target.value = value;
        currentNumber = value;
        
        // Actualizar tabla en tiempo real
        if (value && value.length > 0) {
            updateTable();
        } else {
            clearTable();
        }
    } catch (error) {
        console.error('Error en handleNumberInput:', error);
    }
}

// Actualizar tabla
function updateTable() {
    try {
        if (!currentNumber || currentNumber.length === 0) return;
        
        const valueCells = document.querySelectorAll('.value-cell');
        const numberReading = document.getElementById('number-reading');
        
        if (!valueCells || valueCells.length === 0) {
            console.error('No se encontraron celdas de valor');
            return;
        }
        
        // Limpiar celdas
        valueCells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('highlight');
        });
        
        // Rellenar celdas desde la derecha
        const digits = currentNumber.split('').reverse();
        
        digits.forEach((digit, index) => {
            if (index < valueCells.length) {
                const cell = valueCells[valueCells.length - 1 - index];
                if (cell) {
                    cell.textContent = digit;
                    
                    // Efecto de highlight
                    setTimeout(() => {
                        if (cell) {
                            cell.classList.add('highlight');
                            setTimeout(() => {
                                if (cell) cell.classList.remove('highlight');
                            }, 1000);
                        }
                    }, index * 100);
                }
            }
        });
        
        // Actualizar lectura
        if (numberReading) {
            try {
                const reading = numberToWords(currentNumber);
                numberReading.textContent = reading || 'Error al leer el número';
            } catch (error) {
                console.error('Error al convertir número a palabras:', error);
                numberReading.textContent = 'Error al leer el número';
            }
        }
        
        // Mostrar explicación visual
        showVisualExplanation();
        
        playSound('success');
    } catch (error) {
        console.error('Error en updateTable:', error);
    }
}

// Convertir número a palabras
function numberToWords(num) {
    if (!num || num === '0') return 'Cero';
    
    const ones = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const teens = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const tens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const hundreds = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
    
    function convertGroup(n) {
        let result = '';
        
        if (n >= 100) {
            if (n === 100) {
                result += 'cien';
            } else {
                result += hundreds[Math.floor(n / 100)];
            }
            n %= 100;
            if (n > 0) result += ' ';
        }
        
        if (n >= 20) {
            const tensDigit = Math.floor(n / 10);
            const unitsDigit = n % 10;
            
            if (tensDigit === 2 && unitsDigit > 0) {
                // Números del 21 al 29 se escriben como veintiuno, veintidós, etc.
                const twenties = ['veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
                result += twenties[unitsDigit];
            } else {
                result += tens[tensDigit];
                if (unitsDigit > 0) result += ' y ' + ones[unitsDigit];
            }
        } else if (n >= 10) {
            result += teens[n - 10];
        } else if (n > 0) {
            result += ones[n];
        }
        
        return result;
    }
    
    const numStr = num.toString();
    const length = numStr.length;
    let result = '';
    
    // Dividir en grupos de 3 dígitos
    const groups = [];
    for (let i = length; i > 0; i -= 3) {
        const start = Math.max(0, i - 3);
        groups.unshift(numStr.substring(start, i));
    }
    
    const groupNames = ['', 'mil', 'millones', 'mil millones', 'billones'];
    
    // Procesar grupos de manera especial para miles de millones
    for (let i = 0; i < groups.length; i++) {
        const groupValue = parseInt(groups[i]);
        if (groupValue > 0) {
            const groupIndex = groups.length - 1 - i;
            let groupText = convertGroup(groupValue);
            
            if (groupIndex === 4) {
                // Billones - casos especiales
                groupText += ' billones';
                
                // Verificar si hay grupos siguientes para combinar
                const nextGroupIndex = i + 1;
                if (nextGroupIndex < groups.length) {
                    const nextGroupValue = parseInt(groups[nextGroupIndex]);
                    if (nextGroupValue > 0) {
                        const nextGroupText = convertGroup(nextGroupValue);
                        const nextGroupPos = groups.length - 1 - nextGroupIndex;
                        
                        if (nextGroupPos === 3) {
                            // Siguiente es miles de millones
                            groupText += ' ' + nextGroupText + ' mil millones';
                            i++; // Saltar el siguiente grupo
                        }
                    }
                }
            } else if (groupIndex === 3) {
                // Miles de millones - casos especiales
                if (groupValue === 1 && groups.length === 4) {
                    // 1000000000 = mil millones
                    groupText = 'mil millones';
                } else {
                    // 4800000000 = cuatro mil ochocientos millones
                    // Combinar con el siguiente grupo si es de millones
                    const nextGroupIndex = i + 1;
                    if (nextGroupIndex < groups.length && parseInt(groups[nextGroupIndex]) > 0) {
                        const nextGroupValue = parseInt(groups[nextGroupIndex]);
                        const nextGroupText = convertGroup(nextGroupValue);
                        groupText = groupText + ' mil ' + nextGroupText + ' millones';
                        i++; // Saltar el siguiente grupo ya que lo procesamos aquí
                    } else {
                        groupText += ' mil millones';
                    }
                }
            } else if (groupIndex === 2) {
                // Millones - solo agregar si no fue procesado en miles de millones
                if (i === 0 || groups.length - 1 - (i - 1) !== 3) {
                    groupText += ' millones';
                } else {
                    continue; // Ya fue procesado en el grupo anterior
                }
            } else if (groupIndex === 1) {
                // Miles
                if (groupValue === 1) {
                    groupText = 'mil';
                } else {
                    groupText += ' mil';
                }
            }
            
            if (result) result += ' ';
            result += groupText;
        }
    }
    
    return result.charAt(0).toUpperCase() + result.slice(1);
}

// Mostrar explicación visual
function showVisualExplanation() {
    try {
        const visualExplanation = document.getElementById('visual-explanation');
        const numberParts = document.getElementById('number-parts');
        
        if (!visualExplanation || !numberParts || !currentNumber) return;
        
        // Formatear número con separadores
        const formattedNumber = formatNumberWithSeparators(currentNumber);
        if (formattedNumber) {
            numberParts.textContent = formattedNumber;
        }
        
        // Mostrar explicación
        visualExplanation.style.display = 'block';
        visualExplanation.classList.add('show');
    } catch (error) {
        console.error('Error en showVisualExplanation:', error);
    }
}

// Formatear número con separadores
function formatNumberWithSeparators(num) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Generar número aleatorio
function generateRandomNumber() {
    try {
        const lengths = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const randomLength = lengths[Math.floor(Math.random() * lengths.length)];
        
        let randomNum = '';
        
        // Primer dígito no puede ser 0
        randomNum += Math.floor(Math.random() * 9) + 1;
        
        // Resto de dígitos
        for (let i = 1; i < randomLength; i++) {
            randomNum += Math.floor(Math.random() * 10);
        }
        
        const numberInput = document.getElementById('number-input');
        if (numberInput && randomNum) {
            numberInput.value = randomNum;
            currentNumber = randomNum;
            updateTable();
        }
        
        playSound('click');
    } catch (error) {
        console.error('Error en generateRandomNumber:', error);
    }
}

// Limpiar tabla
function clearTable() {
    try {
        const numberInput = document.getElementById('number-input');
        const valueCells = document.querySelectorAll('.value-cell');
        const numberReading = document.getElementById('number-reading');
        const visualExplanation = document.getElementById('visual-explanation');
        
        if (numberInput) numberInput.value = '';
        
        if (valueCells && valueCells.length > 0) {
            valueCells.forEach(cell => {
                if (cell) {
                    cell.textContent = '';
                    cell.classList.remove('highlight');
                }
            });
        }
        
        if (numberReading) {
            numberReading.textContent = 'Ingresa un número para ver su lectura';
        }
        
        if (visualExplanation) {
            visualExplanation.style.display = 'none';
            visualExplanation.classList.remove('show');
        }
        
        currentNumber = '';
        playSound('clear');
    } catch (error) {
        console.error('Error en clearTable:', error);
    }
}

// Toggle panel de ayuda
function toggleHelp() {
    const helpPanel = document.getElementById('help-panel');
    
    if (!helpPanel) return;
    
    if (helpPanel.style.display === 'none' || !helpPanel.style.display) {
        helpPanel.style.display = 'block';
        helpPanel.classList.add('show');
    } else {
        helpPanel.style.display = 'none';
        helpPanel.classList.remove('show');
    }
    
    playSound('click');
}

// Funciones de utilidad adicionales
function addCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function removeCommas(str) {
    return str.replace(/,/g, '');
}

// Validar entrada numérica
function isValidNumber(str) {
    return /^\d+$/.test(str) && str.length <= 15;
}

// Obtener posición de dígito
function getDigitPosition(index, totalLength) {
    const positions = [
        'unidades', 'decenas', 'centenas',
        'unidades de mil', 'decenas de mil', 'centenas de mil',
        'unidades de millón', 'decenas de millón', 'centenas de millón',
        'unidades de mil de millón', 'decenas de mil de millón', 'centenas de mil de millón',
        'unidades de billón', 'decenas de billón', 'centenas de billón'
    ];
    
    const positionIndex = totalLength - 1 - index;
    return positions[positionIndex] || 'posición desconocida';
}

// Exportar funciones para uso global si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        numberToWords,
        formatNumberWithSeparators,
        isValidNumber,
        getDigitPosition
    };
}