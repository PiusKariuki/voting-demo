import { atom } from "recoil";

const localStorageEffect =
	(key) =>
	({ setSelf, onSet }) => {
		const savedValue = localStorage.getItem(key);
		if (savedValue?.length > 2) setSelf(JSON.parse(savedValue));
		onSet((newValue, _, isReset) => {
			isReset
				? localStorage.removeItem(key)
				: localStorage.setItem(key, JSON.stringify(newValue));
		});
	};

export const user = atom({
	key: "token",
	default: "",
	effects_UNSTABLE: [localStorageEffect("voting_tkn")],
});
