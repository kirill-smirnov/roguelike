export class _Math {
	static directionVec(d) {
		if (d=='up') return [1, 0]
		if (d=='down') return [-1, 0]
		if (d=='left') return [0, -1]
		if (d=='right') return [0, 1]
	}

	static tan(vec) {
		return vec[0]/vec[1];
	}
}