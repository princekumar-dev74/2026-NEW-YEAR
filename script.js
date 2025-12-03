const bars = [
	['end', 'top'],
	['side', 'top', 'left'],
	['side', 'top', 'right'],
	['middle'],
	['side', 'bottom', 'left'],
	['side', 'bottom', 'right'],
	['end', 'bottom']
];

const $main = document.querySelector('main');

const addDigits = number => {
	const initGroup = (number, padding = 2) => {
		const $group = document.createElement('div');
		$group.classList.add('group');

		const digits = [...`${number}`.padStart(padding, 0)].map(digit => {
			const $digit = document.createElement('figure');
			$digit.classList.add('digit');
			$digit.setAttribute('data-digit', digit);
			bars.forEach(classes => {
				const $span = document.createElement('span');
				$span.classList.add(...classes);
				$digit.append($span);
			});
			return $digit;
		});

		$group.append(...digits);

		return {
			element: $group,
			set number(val) {
				number = val;
				const padded = `${number}`.padStart(padding, 0);
				const displayDigits = padded.substring(padded.length - padding);
				displayDigits.split('').forEach((digit, i) => {
					digits[i].setAttribute('data-digit', digit);
				});
			},

			get number() {
				return number;
			}
		}
	}

	const $digits = document.createElement('div');
	$digits.classList.add('digits');
	const group = initGroup(number, 3); // For days, use 3 digits
	const groupShadow1 = initGroup(number, 3);
	const groupShadow2 = initGroup(number, 3);
	groupShadow1.element.classList.add('shadow');
	groupShadow1.element.classList.add('shadow1');
	groupShadow2.element.classList.add('shadow');
	groupShadow2.element.classList.add('shadow2');
	$digits.append(group.element);
	$digits.append(groupShadow1.element);
	$digits.append(groupShadow2.element);
	$main.append($digits);

	return {
		set number(val) {
			number = val;
			group.number = val;
			groupShadow1.number = val;
			groupShadow2.number = val;
		},
		get number() {
			return number;
		}
	}
}

const addColon = () => {
	const $colonGroup = document.createElement('div');
	$colonGroup.classList.add('colon-group');
	const $colon = document.createElement('figure');
	$colon.append(document.createElement('span'));
	const $colonShadow1 = document.createElement('figure');
	$colonShadow1.append(document.createElement('span'));
	const $colonShadow2 = document.createElement('figure');
	$colonShadow2.append(document.createElement('span'));
	$colon.classList.add('colon');
	$colonShadow1.classList.add('colon', 'shadow', 'shadow1');
	$colonShadow2.classList.add('colon', 'shadow', 'shadow2');
	$colonGroup.append($colon);
	$colonGroup.append($colonShadow1);
	$colonGroup.append($colonShadow2);
	$main.append($colonGroup);
}

const init = () => {
	const targetDate = new Date('2026-01-01T00:00:00');
	
	const numberDay = addDigits(0);
	addColon();
	const numberHour = addDigits(0);
	addColon();
	const numberMinute = addDigits(0);
	addColon();
	const numberSecond = addDigits(0);
	
	const update = () => {
		const now = new Date();
		const timeDiff = targetDate - now;
		
		if (timeDiff <= 0) {
			numberDay.number = 0;
			numberHour.number = 0;
			numberMinute.number = 0;
			numberSecond.number = 0;
			return; // Stop updating
		}
		
		const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
		
		numberDay.number = days;
		numberHour.number = hours;
		numberMinute.number = minutes;
		numberSecond.number = seconds;
		
		requestAnimationFrame(update);
	}
	update();
}

if (/^(?:(?!chrome|android)[\s\S])*(?:safari|iPad|iPhone|iPod)/i.test(navigator.userAgent)) {
	document.body.classList.add('safari');
}

// Snowfall effect
const createSnowflake = () => {
	const snowflake = document.createElement('div');
	snowflake.classList.add('snowflake');
	snowflake.style.left = Math.random() * 100 + '%';
	snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5 seconds
	snowflake.style.width = snowflake.style.height = Math.random() * 5 + 2 + 'px'; // 2-7px
	document.querySelector('.snow').appendChild(snowflake);

	setTimeout(() => {
		snowflake.remove();
	}, 5000);
};

setInterval(createSnowflake, 200); // Create a snowflake every 200ms

init();
