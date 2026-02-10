---
id: 5
title: abs()
sidebar_position: 5
---
`filter` 是 Python 的内置高阶函数，顾名思义，它的作用是 **“过滤”**。它用于遍历一个序列，根据指定的条件（函数）筛选出符合要求的元素，并丢弃不符合要求的元素。

### 1. 基础介绍

#### 语法
```python
filter(function, iterable)
```
*   **`function`**: 一个返回布尔值（`True` 或 `False`）的函数。
    *   如果函数返回 `True`，该元素会被**保留**。
    *   如果函数返回 `False`，该元素会被**丢弃**。
    *   **特殊用法**：如果传 `None`，则会过滤掉所有“假”值（如 `0`, `None`, `False`, `""`, `[]` 等）。
*   **`iterable`**: 需要被过滤的可迭代对象（列表、元组等）。

#### 特点
*   **惰性求值**：与 `map` 和 `zip` 一样，Python 3 中的 `filter` 返回的是一个**迭代器** (`filter object`)，只有在遍历或转换时才会进行计算。
*   **非破坏性**：它不会修改原始列表，而是返回一个新的迭代器。

#### 简单示例
```python
# 筛选偶数
numbers = [1, 2, 3, 4, 5, 6]

def is_even(n):
    return n % 2 == 0

# 使用 filter
result = filter(is_even, numbers)

print(list(result))  # [2, 4, 6]

# 使用 lambda 简化
print(list(filter(lambda x: x % 2 == 0, numbers)))
```

---

### 2. 项目中的实际使用场景

`filter` 在数据清洗、权限控制和文件处理等场景中非常有用。

#### 场景一：数据清洗（去除空值/无效值）
这是 `filter` 最“黑科技”的用法。在处理表单提交或 Excel 数据时，经常会遇到 `None`、空字符串 `""` 或 `0`。

**应用实例**：去除列表中的无效数据。

```python
# 模拟脏数据：包含 None, 空字符串, 0, False
raw_data = ['Alice', '', None, 'Bob', 0, False, 'Charlie']

# 传 None 作为第一个参数，自动过滤掉所有 False 的值
clean_data = list(filter(None, raw_data))

print(clean_data)
# 输出: ['Alice', 'Bob', 'Charlie']
```

#### 场景二：复杂对象筛选（业务逻辑过滤）
在后端开发中，经常需要从数据库查询出的对象列表中筛选出符合特定业务规则的数据。

**应用实例**：筛选出状态为“激活”且年龄大于 18 的用户。

```python
users = [
    {'name': 'UserA', 'active': True, 'age': 20},
    {'name': 'UserB', 'active': False, 'age': 25},
    {'name': 'UserC', 'active': True, 'age': 16},
    {'name': 'UserD', 'active': True, 'age': 30},
]

# 筛选逻辑：必须激活 且 成年
def valid_user(u):
    return u['active'] and u['age'] >= 18

active_adults = list(filter(valid_user, users))

print(active_adults)
# 输出: [{'name': 'UserA', ...}, {'name': 'UserD', ...}]
```

#### 场景三：文件系统过滤
在处理文件上传或批量处理文件时，需要根据后缀名筛选特定类型的文件。

**应用实例**：只处理 `.jpg` 或 `.png` 图片文件。

```python
import os

files = ['report.pdf', 'image1.jpg', 'data.csv', 'logo.png', 'notes.txt']

# 筛选图片
images = list(filter(lambda f: f.endswith(('.jpg', '.png')), files))

print(images)
# 输出: ['image1.jpg', 'logo.png']
```

#### 场景四：安全与敏感词过滤
在评论系统或聊天室中，需要过滤掉包含敏感词的消息，或者只保留合规的消息。

**应用实例**：筛选出合规的评论（不包含敏感词）。

```python
comments = [
    "这是一个很好的产品",
    "垃圾产品，不要买",  # 假设 '垃圾' 是敏感词
    "物流很快，好评",
    "你是傻瓜吗"       # 假设 '傻瓜' 是敏感词
]

sensitive_words = ['垃圾', '傻瓜']

def is_clean(text):
    # 如果 text 中包含任意敏感词，返回 False (丢弃)
    for word in sensitive_words:
        if word in text:
            return False
    return True

clean_comments = list(filter(is_clean, comments))

print(clean_comments)
# 输出: ['这是一个很好的产品', '物流很快，好评']
```

---

### 3. `filter` vs 列表推导式

与 `map` 类似，`filter` 的功能也可以用列表推导式实现，而且通常列表推导式更易读。

*   **列表推导式写法**：
    ```python
    # [x for x in data if condition]
    res = [x for x in numbers if x % 2 == 0]
    ```
*   **Filter 写法**：
    ```python
    # filter(condition, data)
    res = list(filter(lambda x: x % 2 == 0, numbers))
    ```

**选型建议**：
1.  **首选列表推导式**：如果过滤逻辑很简单（比如比较大小），或者需要同时进行 `map` 操作（比如筛选后+1），列表推导式 `[x+1 for x in data if x > 0]` 可读性完胜。
2.  **使用 `filter` 的情况**：
    *   当你需要过滤空值时：`filter(None, data)` 非常简洁。
    *   当过滤函数已经存在时：比如 `filter(str.isdigit, string_list)` 比 `[x for x in string_list if x.isdigit()]` 运行效率略高且代码更短。
    *   当你只需要一个迭代器而不是完整列表时（为了节省内存）。