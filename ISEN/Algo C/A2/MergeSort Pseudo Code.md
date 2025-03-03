`````C
mergeSort(array, left, right){ (left = left index of the array, right = right index of the array)
	if left > right{
		return
	}
	middle = (left+right) / 2
	mergeSort(array, left, mid)      T(n/2)
	mergeSort(array, mid+1, right)   T(n/2)
	merge(array, left, mid, right)   M(n)
}
``````


`````C
merge(array, left, mid, right){
	n1 = mid - left + 1
	n2 = right - mid
	leftArray[n1]
	rightArray[n2]
	for i = 0 to n1 - 1{
		leftArray[i] = array[left + i]
	}
	for j = 0 to n2 - 1{
		rightArray[j] = array[mid + 1 + j]
	}
	i = 0
	j = 0
	k = left
	
	while i < n1 and j < n2{
		if leftArray[i] <= rightArray[j]{
			array[k] = leftArray[i]
			i = i + 1
		}
		else{
			array[k] = rightArray[j]
			j = j + 1
		}
		k = k + 1
	}

	while i < n1{
		array[k] = leftArray[i]
		i = i + 1
		k = k + 1
	}

	while j < n2{
		array[k] = rightArray[j]
		j = j + 1
		k = k + 1
	}
}
`````

````C
T(N) = 2 *  T(N/2) + M(N) = 2 * T(N/2) + constant * N

……

= 2^k * T(N/2^k) + k * N * constant with k = number of sub array

= N * T(1) + N * log(N) * constant

= N + N * log(N)

= N * log(N)

````

````C
BubbleSort (array, size){SS
O(n)for int = 1 to size{
	O(n)for j = 0 to size -1{
			if array[j] > array[j+1]{
				swap(array[j], array[j+1])
			}
		}
	}
}
````

````C
swap (elemA, elemB){
	var = elemA
	elemA = elemB
	elemB = var
}
````

````C
Counter = {0} * k

execution time: k (initialization of all the values from the counter to zero, to begin counting at 0)
````

````C
for (i=0;  i < array size ; i++){  
            counter ++  
}

execution time: n (size of the array)
````

````C
for (i=0; i < k; i++){  
	for (j=0; j < number of letter counted; j++){  
		array[index] = i;  
	}  
}
execution time: k + n, the first for repeat k time, for each assume value. And          there is only n number how’s been counted.
````

````C
T(n) = k + n + n + k  
O(n) = n + k
````

[[TP1 Exercice 1.canvas|TP1 Exercice 1]]
[[MergeSort.png]]
[[MergeSort.canvas|MergeSort]]
