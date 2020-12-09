// Bubble Sort

// Naive Bubble Sort
function naiveBubbleSort(arr){
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr.length; j++){
            if(arr[j] > arr[j + 1]){
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}


// Optimized Bubble Sort - The noSwaps variable exists to tell us if we've gone all the way through the array without making any swaps,
// so that we can save all of the other comparisons that would occur if we didn't break out of the loop
function bubbleSort(arr){
    var noSwaps; 
    for(var i = arr.length; i > 0; i--){
        noSwaps = true; 
        for(var j = 0; j < i - 1; j++){
            if(arr[j] > arr[j + 1]){
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                noSwaps = false;
            }
        }
        if(noSwaps) break;
    }
    return arr;
}



// Selection Sort

function selectionSort(arr){
    for(var x = 0; x < arr.length; x++){
        var min = x;
        for(var y = x + 1; y < arr.length; y++){
            if(arr[y] < arr[min]){
                min = y;
            }
        }
        if(x !== min){
            var temp = arr[x];
            arr[x] = arr[min];
            arr[min] = temp;
        }
    }
    return arr;
}


// Insertion Sort

function insertionSort(arr){
    for(var x = 1; x < arr.length; x++){
        var currentVal = arr[x];
        for(var y = x - 1; y >= 0 && arr[y] > currentVal; y--){
            arr[y + 1] = arr[y];
        }
        arr[y+1] = currentVal;
    }
    return arr;
}

// Merge Sort - A portion of the merge sort algorithm is actually the sorting arrays problem that you've solved before - it's essentially
// a combination of that and recursion

function mergeArrays(arr1, arr2) {
    var newArr = [];
    var x = 0;
    var y = 0;

    while (y < arr2.length && x < arr1.length) {
    	if (arr1[x] < arr2[y]){
    		newArr.push (arr1[x]);
			x++;
    	}
    	else if (arr2[y] < arr1[x]){
			newArr.push (arr2[y])
    		y++;
    	}
    	else {
    		newArr.push (arr1[x]);
    		newArr.push (arr2[y]);
    		x++;
			y++;
    	}
    }

    if (y < arr2.length) {
    	for (; y < arr2.length; y++)
    		newArr.push (arr2[y]);	
    }
    else if (x < arr1.length) {
    	for (; x < arr1.length; x++)
    		newArr.push (arr1[x]);
    }

    return newArr;
}

function mergeSort(arr){
    if(arr.length <=1){
        return arr;
    }
    var midpoint = Math.floor(arr.length/2);
    var left = mergeSort(arr.slice(0,midpoint));
    var right = mergeSort(arr.slice(midpoint));
    return mergeArrays(left, right);
}


// Quick Sort - Like Merge Sort, Quick Sort has a subfunction that helps complete its functionality. In this case, we start with a function
// that creates a pivot point, and arranges values around that pivot. 

function pivot(arr, start=0, end=arr.length-1){
    function swap(array, x, y){
        var temp = array[x];
        array[x] = array[y];
        array[y] = temp;
    }

    var pivot = arr[start];
    var swapIdx = start;
    
    for(var x = start + 1; x < arr.length; x++){
        if(pivot > arr[x]){
            swapIdx ++;
            swap(arr, swapIdx, x);
        }
    }
    swap(arr, start, swapIdx);
    return swapIdx;
}

function quickSort(arr, left = 0, right = arr.length - 1){
    if(left < right){
        var pivotIndex = pivot(arr, left, right);
        //left
        quickSort(arr, left, pivotIndex - 1);
    
        //right
        quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
}


// Radix Sort 

function getDigit(num, x){
    return Math.floor(Math.abs(num) / Math.pow(10, x)) % 10;
}

function digitCount(num){
    if(num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums){
    var maxDigits = 0;
    for(var x = 0; x < nums.length; x++){
        maxDigits = Math.max(maxDigits, digitCount(nums[x]));
    }
    return maxDigits;
}

function radixSort(nums){
    var maxDigitCount = mostDigits(nums);
    for(var k = 0; k < maxDigitCount; k++){
        var digitBuckets = Array.from({length : 10}, () => []);
        for(var x = 0; x < nums.length; x++){
            var digit = getDigit(nums[x], k);
            digitBuckets[digit].push(nums[x]);
        }
        nums = [].concat(...digitBuckets);
    }
    return nums;
}
