---
id: 3
title: zip()
sidebar_position: 3
---
`zip` 是 Python 的一个内置函数，用于将多个可迭代对象（如列表、元组、字符串）中对应的元素打包成一个个元组，然后返回由这些元组组成的迭代器。

形象地理解，它就像拉链（Zipper）一样，将两边的链牙（数据）一一咬合在一起。

### 1. 基础介绍

#### 语法
```python
zip(*iterables)
```

#### 核心特性
1.  **并行迭代**：它从每个传入的可迭代对象中依次取出一个元素，组成元组 `(item1, item2, ...)`。
2.  **木桶效应（短板原理）**：如果传入的列表长度不一致，`zip` 会**以最短的那个列表为准**，多余的部分会被直接丢弃。
3.  **惰性求值**：在 Python 3 中，`zip` 返回的是一个迭代器，只有在遍历或转换（如转为 list）时才会生成数据，这有利于节省内存。

#### 简单示例
```python
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]

# 打包
zipped = zip(names, ages)

# 转换为列表查看
print(list(zipped))
# 输出: [('Alice', 25), ('Bob', 30), ('Charlie', 35)]
```

---

### 2. 项目中的实际使用场景

`zip` 在数据处理、文件解析和算法实现中非常常用。以下是几个典型的工程场景：

#### 场景一：构建字典 (最常用)
这是 `zip` 最经典的使用场景。当你分别拥有“字段名列表”和“值列表”时，可以一行代码将它们合并为字典。

**应用实例**：在之前的 Excel/CSV 解析工具类中，我们读取到的表头是 `['Name', 'Age']`，读取的一行数据是 `['Alice', '25']`，需要将它们组合。

```python
headers = ['ID', 'Name', 'Role']
row_values = ['101', 'Admin', 'Manager']

# 瞬间生成字典
user_info = dict(zip(headers, row_values))

print(user_info)
# 输出: {'ID': '101', 'Name': 'Admin', 'Role': 'Manager'}
```

#### 场景二：同时遍历多个列表
当需要同时处理两个或多个相关联的数据集时，使用 `zip` 可以避免使用繁琐的索引（`range(len(...))`）。

**应用实例**：电商系统中，同时遍历商品名称、价格和销量来计算报表。

```python
products = ['Apple', 'Banana', 'Orange']
prices = [5.0, 3.0, 4.0]
sales = [100, 200, 150]

# Pythonic 的写法，不需要 i 索引
for prod, price, sale in zip(products, prices, sales):
    total = price * sale
    print(f"{prod} 总销售额: {total}")
```

#### 场景三：矩阵转置 (行列互换)
在数据分析或算法题中，经常需要将二维数组的行变成列。利用 `zip` 配合解包操作符 `*` 可以极其优雅地实现。

**应用实例**：图像处理或批量数据重组。

```python
# 原始矩阵 (3行2列)
matrix = [
    [1, 2],
    [3, 4],
    [5, 6]
]

# 转置 (变成2行3列)
# *matrix 将列表解包为三个列表参数传入 zip
transposed = list(zip(*matrix))

print(transposed)
# 输出: [(1, 3, 5), (2, 4, 6)]
```

#### 场景四：数据解压 (Unzipping)
`zip` 的逆操作也是 `zip`。如果你有一个包含元组的列表，想把它还原成两个独立的列表，可以使用 `zip(*zipped_data)`。

**应用实例**：从数据库查询结果（通常是元组列表）中分离出 X 轴和 Y 轴数据用于绘图。

```python
# 数据库查出的坐标点
points = [(1, 10), (2, 20), (3, 30), (4, 40)]

# 分离 x 和 y
x_coords, y_coords = zip(*points)

print(x_coords) # (1, 2, 3, 4)
print(y_coords) # (10, 20, 30, 40)
```

#### 场景五：检查数据一致性 (配合 strict 参数)
在 Python 3.10+ 版本中，`zip` 新增了 `strict=True` 参数。如果在项目中必须保证两个列表长度一致，否则视为异常（例如：学生名单和成绩单长度必须一样），可以使用此特性。

```python
names = ['A', 'B']
scores = [90, 80, 70] # 长度不一致

# 默认情况：不会报错，直接丢弃 70
# list(zip(names, scores)) -> [('A', 90), ('B', 80)]

# 严格模式：会抛出 ValueError
# list(zip(names, scores, strict=True)) 
# 报错: ValueError: zip() argument 2 is longer than argument 1
```

### 3. 补充：处理长度不一致的数据

如果你不想丢弃多余的数据，而是想用 `None` 或默认值填充短缺的部分，不能使用内置的 `zip`，而应该使用标准库 `itertools` 中的 `zip_longest`。

```python
from itertools import zip_longest

names = ['A', 'B']
scores = [90, 80, 70]

# 使用 fillvalue 填充缺失值
result = list(zip_longest(names, scores, fillvalue='缺考'))

print(result)
# 输出: [('A', 90), ('B', 80), ('缺考', 70)]
```