nums = [3,2,4]

target = 6

# for i in range(len(nums)):
#     for j in range(i+1,len(nums)): 
#         # if nums[i] + nums[j] == target:
#             print(i,j)

# hash_values = {}

# for i, num in enumerate(nums):
#     complement = target - num
#     if complement in hash_values:
#         print ([hash_values[complement], i])
#     hash_values[num] = i



            # if stack_res == stack[i]:
            #     stack.pop(i)
            #     print(stack_res)

list1 = [1,2,4]
list2 = [1,3,4]

for i in list1:
    for j in list2:
        if i and j == 1:
            list1.append(list2)
            print(list1)