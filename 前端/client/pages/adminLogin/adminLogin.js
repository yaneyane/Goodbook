// pages/adminlogin/adminlogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    originalphone: 'wjq',
    originalPassword: '123123',
    phone: '',
    password: '',
    login_image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAABRCAYAAAA98i+pAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAhAklEQVR42u2deXQV15Xuf7uq7qh5QLOQEBJICDCTAWMzGAcDHiAe2nZiO7GT7rgTZ+x0Osnr1y/tl37pTjrD6wydOI6HOHHsGM8YY0YbsLExM0JiECAkIaF5vrpj1ek/rrggECBAE4m/tViLW3Xq1K5TW+fss/e3dwl/RRARfcmSfKPDptl1pRyG6XQoCRh2wy4gAPgACYlSIUtEDyibpinVR1+6JkqFL0ETUfgEb+ScphDQDU1p4lV4wWvoyrLsptv0m7oeDIVCblPXPaGGhiNWXh7Wyy+LApRSfd5uxEKGW4DBfLalSwvsAcMRjyLTEGO8EjVRhHFKkQXEgThElIESUSACCs54fxL+oRR9vFTpdUzkdJtw+/Clp84pJZagLIWYgB+UH+hGpAOlmoGTQLUlUqNZoTpL6a1Wt7+ju7urOyvrROCll7CAEadcfzEKJCKyePFYu1d3JDh1ex6oaxXMQShGkSmiokH0EfzMSimUiLJQ4leoDkGaFdSKUImljlgix8QK1aDTgjfU4XFaXd4T0b5du3aZIjIss9dIHcz+CS8iU29NcyWq1EzN4FqUWojIbFHkIrgAbbhlHEAopZQlEAQ8CtoEaQZqgeNKqaNKyVGs4PGAYZykfV/Xpk3KZJBnratOgUREpt6W5holSdkKfQ7IUhE1SylJE8E+3PINIyylCAmqEziBsBPYYilrpxH0Va5eXd4FWAN906tCgUREm7OsIMqNPVdT+jyQJQo1XYRkENtwyzdSoZQyEVpR7BPkDTMUXBv0dFVs2lTpG6h7jFgFmjYNW3TmuDinuMcp1EIRWSKKYgWxIn9RS9OQQCllilCvFKsty3reCHm3v/32kY4r7XfEKJCIyOy7spyxgYRUpZgoIvOBG0HGI0SNJFmvdijoRKktStRvjIB30+rV5ZetSMP+UoqLi+2jssm22415YXuG6SiVjohzJMj3lwwFfoH3LaV+qQc8Gy5nRhq2F3T33egd/kkFoukPgLpHKXJFPrZnhgMK1S1K1ioJ/bQi4P+ofHW5v7/XDrkCiYjMu6Uo1a7bPiXwKMiYj22aEQKlmkH9LmjKL955a19tf/xKQ6ZAIiILlxcmimncrIn2FRFmfLyDGnlQCktgh6Wpf6ktD71bWloauFD7QVMgEdFuumlSsh4juZZJpiCTBXW7Qib9lftrrgooVJMo9e++dvO3mzaVdp2v3aAo0PTb0t2Jkvo3IuqbIlIAOC7nXpqmYVkD7vv6GP2ECsfsHje1wP/d8OqB5r7aDLgCzb9lQprDMP5VRPss4LzcfrIyc5k5Yy4FY4swDBvt7S00NtdTWXWUw+WltLQ29bsvEWF0dh5Zmbk0NdVzqHz/QD/2XyyUUibwR9Oyvr3hzZL6s88PqAJ94o7iIs0yfi7ITVfSd1RUDP/w5e9x/XU3nXPOsiwOlZfyxNM/oezg3n71N75gIn/38DeYOGEaO3Zt5Ve//XdO1p0YyEfvEy6nG90wUJaFP+AnFAoO+j0HA2EnpDzVHQp9e8uq/a1nnjMG4gbz5mE44ibP00z5FSKFV9qfiJCQkNznOU3TKBo/iUe/8B1+8vPvcez44Qv2lZiQzPLb7mPihGkA1JyswuPpHKChPRdJSSncOHcJE4qm4PV24/V6sJTCMAy6PV10e7vxeDpoaWumofEkdXU1tHe0XvmNBxEioivFZ126XlmwtODHZ27zr1iB5s0b7XQlJD6g4PtA2kAI3NXVwbN/+m+mTp5Fpyfs2xqVlEpqagaTiqcT5Y5mbF4h829YzInaSgKBvt0WDoeTuz75GebMWgjA4SNlrN/4Bh2d7YM10My/YTF/+9A3+jxvWRaBnpkoEAjgD/qor6/l9VXP88G2dwdFpoF7NuwovpVnc+8ph7foifLrV9LpokVj44zY+O+CekyQhIEUuK6+hj37PuLAoX0cLi9lb8l29pfuJjkphTG5BUBYQd7Z9BbB4Lk7TU3TeOC+R1h26304nS4Annj6p+zeu21QBzojPZtZM+aiaecOrYhgGDbsdgcul5uY6FjSUjOZds1sOrs6OXLswKDKdsUQcSpkQvbY+NXHy5va4QoU6KbbJ6bqdtd/CuqLgly2sdwfWJaFaYbCS48I82+4GQCfr5u3171K4CwFio6O5dEvfIflt30KwzDw+3288NKTvPn2i5zyjcXFJpCbk48gdHs9AyZrZdVRSkp3caK2kqrqCk7UVNDc2kRXVweg8HR34ff7CJkh7DY7IoLD4SQuLoGjFYcuaXMwTEjRNd3nmJS0pbGs0bysJWzBrYU5uui/UIpbRWRIvcianLbN/QE/yUmpdJ1h0yTEJ3HPXZ/j5puWAxAI+Fn3zkqe+/PjEeXJzcnn/nsfYdaMeXR5Onjq2f9i/TtvDoh8lmWxb/8Oyg7uRRPppdxJiaPC/5JSSEpM4bpZC5gyaSa6rlM0fjKjs/I4cnRkz0IiaErxcHrAWFEGuy9ZgRbdOqVA09VvELmRYQiFxMcnEQoFMQwbgYAfm723T3LK5JksuvE2IMwR3bZ9M8+9cFp5xo4Zz+c+81WmT50DgDPkYvbMBWx4dxUDyQjta8fV3NJIc0sjHCkDYO++j/jR//sdCfFJAKSmZmCz2ftckkcSRCTVUNw/bx4ll6RAi26dUCS6ehKR6wZaqDuXPYDLFcWm99Zwoub4edslJ6ZE/h8MBs8Z7MLxk4mOjgXANEMcOFxCa1vYB5aWmsldn/xMRHkOHNrHE0//lIOHSwZpqC8MRXgpPYW4mPgRrzw9ECUstSdN/lG/FWjx8onjldKflEFQntiYOJbdeh+pKemMzh7DS6/+nvLzTOUZGaPR9bDYgaAfj6e3lz0uNj7yf8OwMXP6DZQd2MPBwyXMv2Ex182cD0B7RytvrXmp376kwUBS4ig0LWwBmKaJGnlJFxeAZOt+ldsv+2X+4mtyldIfHwzlAdB1g47OdkQ05t+wmC987h+ZPuXcW7mcbvLzCpEeO6ilpZH2jpZebXbv3YZpmpHfUybP5Ftf/z4zps3hulkLcLmiAFiz/jW2fvjOEA1230hPy4r837JMzFBoWOW5FIhSTgyVdlEFWry4KN3p5NciMm+whGlrb2HFq8+E7QNgUvE0/u17v+TvP/+tXoN8zeRrI79DoSAlpbsIBHpP+R/t2MJHO7b0OpaZkcPXvvQv5OeFfZzHjh/mzdUr8HR3MZxITcno9bu9o21Y5bkUKNCUiOuCS9jcWycmoOs/BlnMIBrMSik+2rGFKHc0dy3/DNlZuYho3H7LvUycMJX3P9xIZdVR5sxeGLmmrr6Gij680K1tzbzw8pPExsZRXDQ1cnxUctjH2dRcz2+f+gkNjSeHfNB7Q8hIzz5jDKC5pWGYZboE6QVlQfd5FWjJknyHpevfQriHIdht+f0+1m9cSUdHG3cse4BJxdPQdZ38sUVkZuTQ3tFKVFRMpP3RY4eoOVnVZ1+HDu/nD8//hofu/zKF4yf1OqdpOqOSU5FwuuhQjfc5MAyD7Kwxkd+WZVLfMNxK3X8oRVAs1dSnI1FEtDETRt+hIT/o4SYPCSxlUV1znB273sfQjcjLt9lsREfH4rA7APB6Paxc/SIHD51/91RXX0NdQw1ZGbkkJ6dGjrtcbsbkFuD1dlNZdXRA6CIiGlmZOUycMJWC/GLGFRSTO3osqaMycDpdiAheb3eva/LGjOeeOx9C18OvoKW1iRWvPIPP570cEYYcItJiIf/V5wy0YNnEAgnHtqKHQ7jWtmZ+8+R/smP3+3zm049SMLYoYjgD7C3ZwZ59H120nz37PuJx/4/54t/+E+MKiiPH01OzePjBr+J2RfHqyueuWN7cnLH8w1ceo2BsEV5fN4GAH6UUmmhoPQpSWXWEnbs/YM3612hpbWLWjLnYbKd9WPvLdkfcDVcJjnjFd+4MVFxcbI9P0H8gIp9gmLMiak9Wkzoqg+KiKb0U6Imnf9ZvTk9Tcz1Hjh1gxrTriYo6/ffgdLqYMW0OHk/XFfuBRmflccN1C4mNjcdm2HA6XDidLhwOJ3a7A7vdQcqodPLHFtHa1kxnZzt3LLuflFHpAHR5Otn47qqriaeklOIF1V625hwFmjIrY7Ym8h8IjuGWMj+viIce/HLEMRgI+Pnzy0/z1pqXIm2iomJIGZVOclIKmemjmTL5WqZNuY6UUem0d7Ti83lpaW3iwKF9FI6bSHyP1/cUpk+djaUU5UfKMM3L20bXN9Sye+826hpqaWltorGxjta2Fro8HQSDQew2B7quEwoG2bHzfVJSMlh00zJsRpgSfrzqKKvXvUJz89VhRCulfCj1w41r6w/3WsKWLMl3KI0vIcOzdJ2JcfnF/O1DX4/8lSplcfhIKe9/sIG01EwmFU8jKzOXxIRkcnMKKBhbRMgMEQwGEIT2jlZeeOlJVq99BYCDh0t48tmf89ADX2bsmPGR+4ho3LX8QZwOFy+//iwdl7mVrq45TnXNcdzuKOJiEnC5o7DZbAiCy+UmPi6R1rZm2tpb+Mynv4TL6Y5ce+DgXqpPVAz3kPcbghwlENgLZ/GBQpq7QEeWDLeA48dN5L67Ps/kiTMix3x+H0mJKfzgsV9jWRaaphEbE8eZsVxDNzB6vNROp4vMjJxe/e7YtRWbzc4D9z1CXu64yPHoqBiW3nwngYCP11e90BM5vzx0d3vo7j5/dP+mBbcyofCaXu2373rvgteMMCgl1jqf90AjnKFAIiJiyCcRBpTXc6koLprKQw98mUnF0yLHujydOOyOXk7FM9HR2Y6hGzgcTnRdx+PpYtuOTby3df1ZT26x9cONBIMBHn7wK72UKDYmjjuXP0iXp5PX33x+UJ4tKSmFv7njs8THJUaOvf/hRkrL9gzjiF8yupXFm5s3E4Iz+EDzl10Tb0N+iJA+HFIZho35Nyzm85/9Wq8dU2dXO6+tfI6TdSfCCmIYBIIByo+WUXZwLwcO7aP0wG6CwQCpKRnous47m9/iD8//hsrqo33eq/ZkFdUnjjM2rzASCQew2+zoms6+/TvpHgQvtc1mo3DcJFJTMjBNk8NHSvn5f3+fzq7BYUgOCpQqMfXAjysONnnhjBnIqVlFKL1gKGVxudx4vd3MmXUjc2Yv5PrZN0ZiVafwxxd+y6rVLxIyQ0S5o8nKymXq5FlMKp6GpmnUNdSQnppF8YSp2O12/H4f72xefVFP8779O/jJf/0fvvX1fyM3Jz9y3Ofrxn7G9lpEsBk2FOHo/5XUa+roaOPFV58hEAxgt9nZ/P5aEhOSuXb6DcTHJRAMBunydFJ7soqDh/ePRBK+Qli10Xao7dSBUwokmNpcNNyX1++lIy42gUcf+Q7JSalkZeYSGxPX63xLaxP//dv/4L0PNkSOzZwxl0/d83ckxidhGDacThfzrr+513U2m52Z02+gsbHuvJ7qUzhacYif/uJ73Ln8QfLzCunu9vDeBxuprasmMSGZ++7+PEmJo2hoqqelpZHWtiYaGutobm5A0zUsS2GZJoGgn+5uD15f2FmYmJBMXFxCeMbUDNzuKLKzxpCWkhGmtNrsZGbm8I9f+z7BYABLKZw9W/5TePPtFTz73K8Gjb99WVC0m6i31AoViVYbAEuXFthNYb4Mod8nMTGZ3NH5jM7O63W8q6uDvSXbefGVZyJ+EV3XuWnBbfzDV/71ov1qmsbiRXcQFRXD75/71UUpooePlPHMH39JVmYOnZ0dHD12EKUUuTkF3LL4Lgyjd/a1ZVm0tjbR3NpEZ1c7wUAAXddxOl2YpollWYRCQdzuKNJTs0hKSiFkhggFgzgcDs4mcDocfTv6p0+9ju073mPbjs1D9UouDlHbu5W/7MxDBoDfcMQbyIShlKW6uoJVb6/g0/d+AcOw0dzcQNWJCrZt38zm99fi958uopWXO47blt5zTh+ndmNnI8odzY3zbuHIsYOsfOvPF5Wlrr6GuvqaXscqjh9mx66tzJh+fWRnB2EFTUpKISkp5aL9Rgb5jN1hfxFOARpBOzOlgpaS57auPNTLOAw/lTJGi8aooZQnZIZYufpF9pRsJzkxBX/QT2Xl0T4NyglFU8nLPW2etbW30NzcwKjkNGJ7CGTBYKBXaMBuDy9la/og3fcHrW3NPPHMz9i55wMmFF5DzuixpKZkEOW+cheZaZr4/T4cDieaplFZfZTGpnosy0TXDBoaa9m2fQuHj5QO5Su5IJRwwDLVes4yAg0AXdR4pcQlQxy4sCyLyqqjVFYdvWC7/LzxvZaS3Xu3ER0V0yua/ebbK/B6u1m66E4SEsI7K6fTRVpaFlXVxy5LvpraSmpqK9m46S2SEpJJTk6NkN/j4xOJjo7F7Y7C7YoiJjouMhsGgwG6PJ0Eg0Fshg1N12hqqmdM7jhEhK0fbuTd99ZQ31BLMBhA13S8vm46OtsHNenxcqGUMlE8vdG9r+7sc4aIaJomhYzgkrjpaWfyZhSxsfHk5YyLGJ0NjSd7XvIoPnHj7ZG2mqZf8tLRFzyeTjyeTqpOVLBrz4fExsQRF5dAXGwiLqcLS6mwHeRw4XA4IoT/hsY6TtQcxzBsLJi7hLF5hXR0trPunZXnkN5GMgTKvUHzJbXytPF8Csa0adN0hTlupNaSi42NJzXltGvKNEMUjZuM2316u7/5/XXU1dWw7JZ7SUo8vRL7/F7aO9sGXKaOznY6Otup5ni/2ttsdtwud0T+M4n0Ix8qZKF+vWVNaW1fZ42oqEZdVEImQ71+9ROpo9IjbEII86fd7tPLmdfXzaTiacy7flEPUez0RFqyfyctLcOfqOdwOEnvYR8ahoFlmVfY49BBKXYEzNCLSqk+iVOaP8puh+ENX1wIhmHr5RSUsxTd5XQzvmAiKaPSeynPofL9vL3uVc7z3EMKm2EjqScdyelw4fMPWJnmwYZHwY82rSqrP18DLUFFOxRD50C8VDQ21bNv/85zjnu95w9aHirfzx9feJy29paLdT8gkIvM3iISWVptNjt+/1XBOlQonmtR9Wu4gPvdUI6gE2WM2JJzTc31rFn/GvFxiUyZfC2GYWPL1vXs2vMBSYkpzJx+A+npWcREx3GippIdu95n03trOFpxiLTUTNo72vAOkj9F13UKx01iUvF0XK4oRKCrq5Ojxw6yr3RnJEkwPi6R5DP8RqE+0nfG5U8gLTWL8iNlnKwf/NpFF4NS7A2ZoR/uXFXXfaF2RjCo2WyGXFGVjsFGSelODh8pJTtrDDbDRlNzPY1N4Vn1zdUv4nS6cLujMc0Qzc0NdHk6mXf9zTxw3yOsWf8ar7zx3KAsZTnZY3n0ke9GovohM4RlWhwq3097RytHjh0EwqS3UzvGLk9nr3I0DoeTO26/n4Xzb2V09hg2bnqLH/3sn4d1vBWqCaW+u3HV/ouSlAwszQClj+Sa3klJKXR1dfRZeKCtvQXO8j1GuaNZevOdjM7OY3R2HjHRMYMSU7LZ7KgzSPmGboAOKaPSyM4aE1Gg2DOyZb1eT4RhmZSUwoP3/T0337QcTdNoa29hb8n2YR5t5cPisaaafRvoR+TYsOymgD5itSc1JYOvfvGfOVFbxfMrnqCt7cJ2jaZp3HPnwxE+UV19Dd3e7v7c6pJxqHw/f3jhcVJT0unq6sDhcGEzbARDQY5WHIq0S4hLjBSEgPDGIDEhmfvv+TuWLLoDgNbWZla8+gxr1r82bGOtlDIFftmsGp7atYt+UQEMh+h+lIzYnNqsjBymT53D9KlzyMst4NdP/Oi8Ze1crigeuv9Rlt/2KSAcbd/w7puDSov48KN3gbChLCJ9pgnFxMRhmiaGYcMwbLhdbpbf9mkWLVwGhF0Rb7z1AitXvzicQ61AnveYoR/sXHWy339xmvjFo8LfmBqRqD1ZHandM6l4Ov/49e+fQ+EASEpM4ZHPfZNlt94LhAs9PfOHX9DQWHdJ97tcKKXOm2N2qpAUgN3uIC93HNfPvjESu1u/cSWr3l4xnJU5FEqtsvB++72zimheDFqDUe+BfrpUhwEn60/w55efYsO7q4BwZP6z93+JaVNmR9oUjpvE5z/7NRYtXIaIRk1tJS++8jTbd70/LDLHxsaTkZ4dsXUgzEaEsE8oNSWjV1788cojmJbFENfqOgWlFGtNK/jo+jcO1V7qxfrJw11mfmFaHsg8Rqgl3dHRxtYPN9Lc0kgwGKSq+hglZbvp7Ghj9qwF3H/vF5h17bxwZLvqKH968Qk2bnrrnH40TSMhPomoqBj8Ad+ApzZnpo9m0U3LWPyJT7Jk0R3MmjGXYCjIqFFpkTx9n99H1YkKxvYUelDKIiYmnuysMaSOSsftjsbn86LrOrquI6INpudagVrj96svvrN6f+XldGAAlmmZqzVN/4YgMZfTyVBh9dpX2PTeGoLBIMlJKdxz18PcueyByF966YE9/Pnlp9hbsh2Hw4mhG4imkZ9XSG5OPnGxCWSkZ5OTnUf50QO8vuqFCIHscuByRREbE0dWZi7XTrueiROmkpWZGynqCdDS2kx9w2mukcfTSU3t6XclojGh8JpemRrNLY3U1ddQ31BL7clqSg/spqR014Dacj0G82sQ+samNaXVl9tPOFTt1Upw8y7C7Zfb0WBBRIiJjsUf8OP3+4iOimXe9YuYMe16pkyeGWlXemA3FZVHyMkey5jcAjLSshmXX4zL5UbXddzu6F5cntycML/omed+dckJfTmjx1I4bhK5OfnMmHo9aakZaJoeyXM/hQOHStizbxvZWadZl91eD5XVx3jljT9y57IH+uz/VC3F4qIpAByvOsLvnvkZO3ZtHZhBVcon8ISlq39b92rpFWUzGgDr1+/z3Lzsmp8pxVwR4gdGyitHemoW8+cuZnzBREZn52EYYX0Px72kZywsgsEgo7PzSEvNIiE+qU+WYl8oLpp6yXSPW26+i4ULbqFg7ITz0lG7PJ0cOlzCG6v+TEnZzl75bYZu0NrazJO///9Un6hgzuyFjB0znvi4xPPKnTs6n+lTrx8QBVJK1QnqMV+7+ccLfUSlv4iMnh7s3mrao55Qim+OhO93uVxRLFxwCw9+6osXbCeiRfLPLxUffPTuJe3SbDY799z1MGmpmX2eb25ppPTAbg6Xl7Jh0ypaW8PFEuLjT+eBORzOnrLFJms3vM6+/TspGFvEuIJi8vMKycsd18v4BqipraKi4tAVlaTp+Wbq+5Yyv53gLN2+ZpMaEMMqokCrV5f7Fy+f8AuFbQHItQPR+ZVAKatXztZA9NfY1IDX66GltYmdu7f2VGbtf4jDZrNRdnAvuq5HGIfBYIC6+hpKy3ZzoraSiuPldHs9jC8opr29FcuyiI2Jj/QR5Y6J5JyZphlhPb675W0g7DjNGzOOjLTRpKWGy8PsL9vNth1brkR56kB+4w0FHt+8qmxA/Rq95u+1bxw4cfPt1/wvpdSfRGRIOdJnw+fz8sFHm0hPzz6HQHbW4PSKhre2NkfqRitlUVtXTUXFYTo622loquPQ4f00Ndej63qvWor9QXe3h6ee/Tmjs8fg9/uorjlOR0fbOZ+l0jWd+XOXMHvmfH7/3K96pSx1e7toaTs/R6m+oZb6hloMw4bNZicUCl6+f0jRhfC6WNZPm07aS3buLBtwj2ovBVJKqaaavZsSMyc/hlL/KSKuy+14ILBz91ZO1lVTOG4y+WMLSRmVjhkKoVDouoEmQpenk7a2FppaGggE/D0zQi3Hq8qxLCsSWji7cNOlKs8pNDXX09Tcmx5ztgPRtEzWb3yDHzz2a9JSM3uR/VtamvpVwCEUCl72rktBpyi1FuGX3tbWDzdvrho0AtI5FuTOnSp4XV7zUzH+pFSU+g7D/CHc2pPV1J6sZuOmVUS5o3E6XSilekW1dV0/ryfYx/Bwbyoqj7BuwxvcufzBXilK9YNXm1GhaAX1tmVZTwU6zG2bN5cNehXRPmkcJ8o6QqmF8TvsYsQIzIDhcZGejWAwEP6Ekq+71wyilBrWeod94ZQyT5k8k5gzlrDN762hpHTn5XZ7Dno+CFehRH5tYX5LD3Q/tfatg+WVlY1DEhc5Lw+o+lBzIHN86oeGSJQopiMjmzM0ElFXX4Om6eTm5ONwONlftos1618fkAqxCtWNYquI+p7PNP/3OytL3jx2qKH+yJGWISVcXzR0MWtpfmycLfobiPonQUYs9XWkwu2OYnLxDLIyczh4uISyg3uvpLCnUko1KZG1mOpZ5evctmFDRUd/Ps89WOhX7Gvp0gKHZXfdo5T8UESGpfzLXzOUwhKhUilWhFAvdDc0H/zwwxMjglh9KcFT7RO3T5qpafqPUVw3EpyNf/lQQQUHsHjaQr0e7Cip3rRJjSju1iVH3xcvLkq3nPavakq+gJB4qdd/jH5A0YWo97DUEwTMd9euLWsdzmXqQrgs+saECRPsGQX6bB3tu0rJQhFGbFbH1YLwMqXqQFaB+QfTI7vWr983gspz9I0r4v/MvXVSgkuXOxD5JkoKP17WLh1KKS9CqVisMK3QSpsVOLb6jK8ij3RcMYFMROTm5YVpyrTfKxqPKEWBfLzlvwhUSClqgPXKsl72mcaO997e06xGQhrtJWIgGYj6J26fkKlpxnKQBwUmMcgf472aoBQWolpE8YGCV82QtakuyjpRuqL0qvhE4fkw4BRWEdHm3VqQ6NQccxTyN6AtEFFpIFdeZ+Xqg0KpDoS9CvWGblrrQn796Lp1e7u5kmqdIwiDyoFesiTf4RNHls0wrtOEpQg3KCVpf+FGt0LRrUSVCLLSVKG14vWWr1t3tBO46paoi2FISPQiIkV3FdmyTJWkgvZJImpuz4d7J4hIAgo7V7cBrlB4lKgDgrwWVGq1H++RrSvLPVejXXMpGK4sDG367WnOlNCoRNPGGCX6JE1xDaIKlSIHJElEOXqWvRGZKdLD8GsFKVHKWqtEXx9oCxzcvLnMM1J9NoOBEfNy7r4bva1tstNyqmhdIwWRXM2SIjTGh3d25KAkEVFOEH2oZVcKS6BbiaoSZBum9U5I13eG2gJVf21KcyZGjAKdD/PmYTgc1zg0LRBrOW2pKBkjwjhBxoMaqxSZgiSAciHYUKJdyXLY49AzURIA1aKQKqBUhO2Wkj3i8x+LjS1rf+klrp4yY4OIEa9A55P77rvR2tuvcQYcPpdh2WINu56sFBkKUjVLEhErTokWjVLRAk4lYgeliTrlo1JYSEiU8iF4BOlErBalpA6lqpXJCT9mkz2gd65fv88HHytMX7haFah/Dyci6i6lTa8QzTumSEZ3BaS7OyCnONSNo6Ks5IYya8sWsQhTJf4ql6Erwf8A3LYQPNEE5rIAAAAASUVORK5CYII="
  },

  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录 
  login: function () {
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      if (this.data.phone == this.data.originalphone && this.data.originalPassword == this.data.password) {
        // 这里修改成跳转的页面 
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        }),
          wx.navigateTo({
            url: '/pages/adminIndex/adminIndex',
          })
      }
      else {
        wx.showToast({
          title: '用户名或密码不正确！',
          icon: 'fail',
          duration: 2000
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})