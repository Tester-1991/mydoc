---
id: 13
title: round()
sidebar_position: 13
---
Python内置函数 `round()` 用于对数字进行舍入操作。

### 1. 函数定义与核心机制

**语法：`round(number, ndigits=None)`**
*   **参数**：
    *   `number`：需要舍入的数字（通常为 `float` 或 `int`）。
    *   `ndigits`（可选）：保留的小数位数。如果省略或为 `None`，则返回最接近的整数。
*   **返回值**：如果省略 `ndigits`，返回 `int` 类型；如果指定了 `ndigits`，通常返回与 `number` 相同的类型（如 `float`）。

**核心机制（重要）：银行家舍入法（Banker's Rounding）**
在 Python 3 中，`round()` 采用的是“四舍六入五成双”的规则（即当数字恰好在两个相邻的数中间时，向最接近的**偶数**舍入）。这与传统的“四舍五入”不同。
*   `round(0.5)` 返回 `0`
*   `round(1.5)` 返回 `2`

---

### 2. 项目使用场景与代码示例

#### 场景一：统计学与大规模数据分析（消除累积误差）
在处理海量数据求和或求平均值时，传统的“四舍五入”会导致结果产生向上的系统性偏差。`round()` 采用的银行家舍入法能够使误差在统计学上正负抵消，从而保证宏观数据的准确性。

**示例：**
```python
# 模拟大规模数据集中的中间值舍入
data =[0.5, 1.5, 2.5, 3.5, 4.5, 5.5]

# Python内置 round() (银行家舍入)
rounded_data = [round(x) for x in data]
print(rounded_data)  # 输出:[0, 2, 2, 4, 4, 6]

# 误差抵消验证
print(sum(data))          # 输出: 18.0
print(sum(rounded_data))  # 输出: 18 (总和保持一致，无系统性偏差)
```

#### 场景二：API 数据响应与前端展示（控制数据体积与可读性）
在后端向前端或第三方系统返回 JSON 数据时，某些计算结果（如经纬度、机器学习模型的置信度得分）可能会产生极长的小数位。使用 `round()` 可以截断不必要的精度，减少网络传输体积并提高可读性。

**示例：**
```python
def format_api_response(sensor_data):
    """处理传感器原始数据，保留两位小数后返回"""
    processed_data = {}
    for sensor_id, value in sensor_data.items():
        # 原始 value 可能是 23.456789123
        processed_data[sensor_id] = round(value, 2)
    return processed_data

# 测试
raw_data = {"temp_sensor_1": 26.3333333, "humidity_sensor_1": 45.6789}
print(format_api_response(raw_data)) 
# 输出: {'temp_sensor_1': 26.33, 'humidity_sensor_1': 45.68}
```

---

### 3. 严谨性补充与注意事项

在实际工程中，使用 `round()` 必须注意以下两个技术细节：

**1. 浮点数精度陷阱（IEEE 754 标准）**
由于计算机底层使用二进制表示浮点数，某些十进制小数无法被精确表示，这会导致 `round()` 出现反直觉的结果。
```python
print(round(2.675, 2)) 
# 输出: 2.67 （而不是预期的 2.68）
# 原因：2.675 在内存中的实际二进制表示略小于 2.675，因此向下舍入。
```

**2. 财务与货币计算的禁忌**
由于上述的浮点数精度问题以及银行家舍入规则，**绝对禁止**在涉及金额、财务结算的项目中直接使用 `float` 和 `round()`。
*   **正确方案**：在财务场景中，必须使用 Python 内置的 `decimal` 模块，该模块支持精确的十进制运算，并允许自定义舍入模式（如 `ROUND_HALF_UP` 即传统四舍五入）。