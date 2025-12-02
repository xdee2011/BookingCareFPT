import React, { Component } from "react";
import Specialty from "./Specialty";
import MedicalAddress from "./MedicalAddress";
import Doctor from "./Doctor";
import About from "./About";
import Social from "./iframeSocial";
import "./Header.scss";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Homepage extends Component {
  render() {
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <img
                className="logo"
                src="data:image/png;base64,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"
              />
            </div>
            <div className="center-content">
              <div className="children-content">
                <div>
                  <b>Specialty</b>
                </div>
                <div className="sub-title">Find Doctor by Specialty</div>
              </div>
              <div className="children-content">
                <div>
                  <b>Health Facilities</b>
                </div>
                <div className="sub-title">Choose hospital clinic</div>
              </div>
              <div className="children-content">
                <div>
                  <b>Doctor</b>
                </div>
                <div className="sub-title">Choose a good doctor</div>
              </div>
              <div className="children-content">
                <div>
                  <b>Examination package</b>
                </div>
                <div className="sub-title">General health check</div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner">
          <div className="content-up">
            <div className="title1">MEDICAL BACKGROUND</div>
            <div className="title2">COMPREHENSIVE HEALTH CARE</div>
            <div className="textbox">
              <FontAwesomeIcon className="icon" icon={faCoffee} />
              <input
                type="text"
                className="search"
                placeholder="Search Something"
              ></input>
            </div>
          </div>
          <div className="content-down">
            <div className="options">
              <div className="child">
                <div>
                  <div className="icon-child">
                    <img src="data:image/png;base64,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" />
                  </div>
                  <div className="text-child">
                    <div>Specialized</div>
                    <div>Examination</div>
                  </div>
                </div>
                <div>
                  <div className="icon-child">
                    <img src="https://previews.123rf.com/images/sarahdesign/sarahdesign1410/sarahdesign141001052/32210370-live-stream-icon.jpg" />
                  </div>
                  <div className="text-child">
                    <div>Remote</div>
                    <div>Examination</div>
                  </div>
                </div>
                <div>
                  <div className="icon-child">
                    <img src="data:image/png;base64,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" />
                  </div>
                  <div className="text-child">
                    <div>General</div>
                    <div>Examination</div>
                  </div>
                </div>
                <div>
                  <div className="icon-child">
                    <img src="https://png.pngtree.com/png-vector/20190629/ourlarge/pngtree-microscope-icon-for-your-project-png-image_1522081.jpg" />
                  </div>
                  <div className="text-child">
                    <div>Medical</div>
                    <div>Test</div>
                  </div>
                </div>
                <div>
                  <div className="icon-child">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAADpCAMAAABx2AnXAAABAlBMVEX///8REiT/ucEBt///TZkAAADa2tv///0Atf8As/8Atf7/u8IAt/4Asv//Spj/vcL/Q5X/YqHg9v8AABz/pLgAABf5/v7/P5P+iK39qswKDCD+qbr/gasAABWX2v696P7+V57+baPo+P7S8P3+5vD+aqj92ej+m7X+krL++fuD1f1Cwv7+sr7+c6b9xduc3f2UlJpBQUyJiZEhIzKu5P5ozf5byf3+m8L93uv9zuH97vX+kbwrvf3+f7J5eYEpKjhtbnZMTFZcXGTF7v79ocX+u9X+irn+frP+dqX+vdWI1/z+c60ZGiyqq65xcXg3OUbr6+vDxcglJzO3t7mnqK9VVV/cobhNAAAUc0lEQVR4nO1dCUPaytqWzclGEhZB2QUVBKqAQNVSQLCt13r09p76///KN0nemUxCAghJtP14enqqCWTmyTvzbrPt7e2www477LDDDjvssMMOO+ywww477LAZEEa1mgRUM/jXPaRdf++KbQ5MoVa+HAxHo5EUiUQ4IRKRJGnUGpTKNY3enwet1plkvzmK8zzHcYKAKUUwN/wP/lnAl+LxUbOPpfenya1aHowwJY2PGzBBfjQoV/8UZlgGmf5Q4peSouQ4XhqW/4xWieYD3NLWIGWykwa1j84MCwu3wLew0sHFW/3MxxUb1helES9INnEIHFYWfJxCVyYLUuOly8x7E3ABylxKthprnCKjVvOyP69hC4aRrM3L/cfhCH+Ss39WuvyIQkMIN0KmnrjmPNca9GtVrbbUHoNpRplaf9CSeCHCsuNH/Q9HDSWHHNsGsbYb9Kt7S/Sd5o70B5KlRwp862OpEYRKrCLE7W8wX6+CWIdqcmOoDTIfiFqyxdDi+LepuEy/xb4VTip/FGaoLwnsK6+99fuoNmBapMQ/fgxmqBlnaVXf7kfgbyRZavG3vho/gKotqjUEbpjc9GVr2ofInXv0tIobVQclJfKmJW60Ve9A8xb/cYjVzFYYb26nz3CDvBT0t8S/e1NEc9p8hJEHtUHVoRa+ld5decxp9+KHnpgfhMrNZu2d3Q+spYm8hHjJq8q8u7AwkrQZCmUfXjLKVN8nuq6OqEldw8E7Obu4uLi5vl378WiOI7tWcpsabgYEbpQUkVaUntm7+F6RsxrU6On92VpxF0ryun8VuOeIBhzx7VY0mNvPWVWOEshqVv18wt4/Pz93en5TT2zx/YCJoT6/pryOZDVqg5r9eQNiu/mSkLNq5fvNQgFD/cVxzYCJJTniRS3vX7enWTstQ24/r/Hds1NDmFiMP0+sX0RNw1b3fSThADQCjcjPl37uRpadeGlcsl/O77NME83ahFbFsYzAjYIVGHrkDcvML3MS0N5N1o2X1iCtbVRWzyxGDHvFkjQIWOHXQF7cwLHc25OTW+3GtcpUW41WKrLqKkH8kYpFiegjGQGnUommF0YLmvv8AmsDFUOufLmoEBay/KneVkRRzDdOZVdu6ucgSTgAa0RoiHav7vq7SlW7LFMlLz/orMJh/D+l3UioLDVZE6aBrJPeDxDIyARIvE0Vn3zNLmh2rebRtIJJEYiKWK+Yn1MT9XwdRJv95lJgMA0SPTo3xG+qE61otNJmaBncxEPSHtUClqLYNn6TT799u1lwulCm3ywFoUSqJFKxxsvfHQ2W1g4VOzEstXzC4FJRtN+VAjBT1Wz253+sLbKqj0ctNytegApsaOH1w4UXru3xIrOwcqhTkRM6MTHNCFvOJliThn03rUf77jSiKsSWvCVv84PR7DoYBaEeKquIha0mLWvqR5QZBZMHQZeGk2h14j5TecnR40Y63043PkWpUkysklhYtJkA9QdDzHiTXNVnYpAcFVjf94byUrFm11S7qGC9DtTkykpiit22Zb/SAodQoLMz4BnKPPE5zHLOqSVmNbuohI9VUB8riYEuMY232RqTkI8VfA066ftje9gRCEy2aXZRKWAfyn7VuGVrimm9X1YSFUqNOsU4MpMMkfnJKxlxUIn0NdsZiEr9OFFw4BUWGypoTPhg+riSaIQVMZ0gngtxHbG6EnzvZeiSW7RhF0RgaQfJ4N7mwCsstvUOqNZF+sGw4XVhKYPIjkgBJaP5C03/PBDUMrwpiS3iJ/QPRqtj3eFEh7mhpKPYU3YwBGHCTI4SQ50BH47zb5S6Co2iyVy7XdB9oth4KKQd6hxW8oWHRlj/oBiu1/NOnwkrp+A6XpDX+QjF+hVOoz3IdFiS69AS1TqtpXiMdYaTWRYbmopIADPnRopv5OFVEWOGqqCKW341RdCJVvf3C7QcUk1ROdSvqCAPpvZtXeepBUdBMSL7BCKj5UJKTPBrhBqRlsg+/6dFcYepUZITukZQ2mFKua7CjeXAyt8gdkbKqMUdCvYQ5PmWkXOg8YlKhlrbRDrcrieilYIossSilbBzG6TEwvZOBkpL8Cu3c2k8XmJb4jkQezB1xyEobC3FoTU+9RiIgRMv55cTCyuGK6MemSVzi53bQxhJTMHSh88XJBYOV+w+rcFEaQOxY6w3lnEDmav3tBQIAgV/fHwk6b4NV7JcTdj7GLZRdmINEBltpIeNtItOdCbmb1uEcSOOjWbPT0mQz3QcpWHNEqjgkygNmunBWt/J1SJN0fgakwOBthj3I0eAwLNnH36bIBRM78hgwAgNB2QgsXCFuXrsRozkQNTPtDOjGlhQPwYpSIwpmP7U+alq1pO1TkqeMmZlI7KilN1EpjyQVnBKUzvIiDd9UfhgJlnP/jtbT4sPrDn2eo4g+iktMt2vwGTe2i68GlTaqnxLC/evkxG/w3xpF2wGR05YzROmk0+n8zZ3WCnQRupszvAbYd9WhTADby7iQ+ySMYZYuEtC7Nyq1uVPVldJD0TMsIS4H+mEZt5wC9Wdy8WcY8GieGj2AwJpzgdLBgEfXyYXjoghptlPVydQFNttoKaI+cPjSiWB3X/W3yIf/GRLuxL3A0V88/CroHFJ7uGcWKUGjXrzbrTyiayayBPliKMyrYUqdRyTHVtUiJinOodG0kDMsGR+aI8kaFzSyiE3JZ9SgyzXXfSc7tbLslVbGB4WtQXGNaI25UqdiOzaINYkqstzZuACU0/xs1EH7C9BoEINMYEiQrhv6G/10Ko3E4tfIppDrrSVOlgzw/8AY+MwdLU1yrYnGz4HtrO4aT0YL9/ax5T84WFaSwYcyg7ahcSTxN8yLhp+pqyZPhL+nBrEyvFFD9wTwEQBkxhbL7Egq9gQW3k1tEA68VCgXdAiMeJ3WcUs5iuqKhc0bSka9gw6GYKewHnvVAGxFhC7hS6me+5Y69XTNo/dkIhsDmGqFj0B7dOeJ1bC6bqhQOlQhW7KUNVIL8Y3nuvpiksIWuDXE7DObaLq7EnFQ7uPb82CiMcGscKiKYMngoYE7wNGQ1bMU9iImFVilFjYGWTQi8Du9EIMY22flg/kWYkR/4D3fpL35ZKm6FSvtMXU2j2usEIk5mbV4QGylZgPFtrWx86h77vZLtyJzEEy2RJhw23QlW0XZmTgomKUh1qG8rj0nhhnIUazOK5vXMEuiZ72wAqzvhAwE60oV5zzplTd/yTEDIl5P7HWJjGaUFwSCYv5RuHhodDIO6Q4xDaV5oPTE6idg5QOmTZWcq3glsSoHYOgxWn4i1ZOS/cacKD9QO2AQz8ToQ8Sl4qkknxwFvtxKzEStaiOafrVIBkADQ5jnrSlkvIHfhGzu1TEWYxG80syTktghpTyQlxGHWtzVot/xGwS27ul8diialhLZCTnI1eUxTvwbHPqmG/E5gvuNRmjjaoPecW5I62QGfYM9WDa/KY+MJ8/pvOrLmhpvhEDl4qNG2iSSpsFkW+H9QhSIfpCG5NYJbPwYUVOMCNQSridbhyb7uVXszCiPDymhWBWKfUVNdxGGROs/YhD/sTxp8Jho1FP59t6qLxiAIKVtKjUK6zXzGgO/9Q9SVlylmVr1wuzD2WYmaMjmjjWjNi6PVCsWxMeZo5qjybJvCdmhOYRzho2XEftzBZoqpX6uvbAmvZSE+xUOOJ5eO1SZYyoQbAPl96eLpv4a7BzS43aBdZmnyRnf1grMIIkt8fEyJScxeT5kayuoKauKzJTYnK2cmEtBrz7uLdhC4KuG+EdUg6399HsklnMWoJuvU5GvChZzSa+2efRQlrT4wWcJDCPOE/VOr/4Uskaq1e0ic6ybUazfKxYwVo85nIePl65P1ssA6ZixL3NcZORlviShdsnZ2c3F/85uv/y9edpomJMFyW+STTB4rhB9aSSfjCvEy/qxqFZoFpcsmT/PCJGRhTX/cL57cn12c23L2Zil4VKAhXsLjKXiYSdFmOhBVfVExAj9maz72INSM5NdLrnOP8elWzhoCcgRuztcwZvnOcKQ27KlheBZus8/d6ogsvijE2BYCJwa/VH7bh3Xo7kSkzOOiiOPbMzeOsDGxGL5GDEVuPIyYBTYrZ7shp15kXeradJKrQ3hLURG80RP/khZ1UK2ZGYcS+bjd6fu6ysrfox8AdJ2I3b9+3NEUVCdiAm3+v3vp25r24Bz0fy0oxRI+aFN/PViZi6ernOow+D6282YsuwKTHw7T1Vikm6huD9JJYRBBcffHPQ1Sye9FtCzLKoZSUxNCfT37wjhpBLJLYZvsBkTGMZEhnrXPk1EuZ6OAJNplDxl548E+ZQqA3s4ytpsF6nKysBXWzoZUskE3K9UbTX4Imon+rpAphlZsalC2DinafhM1lXNfToeWQeILPENrtqbwW6kMFLK9YniyM8et6iW6x+WfUdGBvzqJsbjyTPlDx75neb42tbAO0EmEi1dD35W5H0fmb4qXUMV71e9QVjqwjbGqgtQVf4efjM86+Mw69WTlZ+ISN43hKpAWklLdhysfw3I60ly2r282pvCkE39zZkaZKNVkxo+0Nutake2ju/+B7NZuWfR+vsNUP2ohC8zAqQt2WHfwtoFkEiFm+D5yrvSCwS93/JNQC8Dq8nG9HNcWwIbG8U4tJxXnkI5LmZkSMzwSuDvbICZEW517OBUbXFbsZJJRbU7rew3M+PqaWo3zK3+SWrkjfIxG1UNtmvzI+FSNhmZagFq/m4ZMGpbNjtxdOAxbEgEkAE0sUQid4lwe8dPYhd8yg6W1UaDLFoI99+EzO0vxSIfaZ7bPgxd9teluTbvP7FsjItHzWHDRDFBGHF6PCw95NWHND3IdPsAvRIvLlWANscOa0/9Qlz4CWs2ujQA5AcYwBtg2yWE5G4NTcs36o02I/Vhzni9pKo880Hsb8/LAOR4r7vwIlgiVDEvl+ZT8XBa/S/i5EgLJDebA4o+e8BU80RzL6zRGJxn09IILsmeDVgsLrAeTC+NpkcKYwC2jkSoVEgLYS2jKDCdDMB4e++XplIkJpDB9k1MuKrN1AmGdLg9jAlAzoeTM3VDo5zrDcxzkIQHilFxtjUY+vpdahaavZdnkFiI5/3sbPh0ZORWzTnOS7echQJWWfqv+NmAcz0jGw3lcSYO+3sL9FR72C3P4YNKLab1QRd1WU48ZHcDHhfZ35rYiSZ4UwMdIfvGTc7yDy0LWw0Cfqdt7mkixY3L2AjQECxRQIOpsFqO7w63jeI8d4vM10OcLw3H4ajY24u+ty/hcHLQcbhNu0BlJeb+0KWcge9iT8sQt2UGGqSwRu3vZjeSWJEU29mx5B5CJurY4Hep4+h0sYZOO1ASoHycp1B/15asbnpRDTtQEp6mpI7L7q2z8/9c52KBdf7TR6qNsRWazJnZy7hReaW+LabogvedKKKfogmDk+S5ablrNf40tOvIBzj3+VEifU2M9CO7yuXhpL1tOEV5xOiGtkoKmBiYGWWvE/tNHKUydT6zRYX5+2HDXOj+fLjuDJGTwxm1NTEOjtfJecl7chWfvG43QjHrTozj6SMAlaLJGyJVPXYXv8L/8tUk/Oyfsiu4HZ8t8AP13CeoRt7PGVlBVCfRJrzTEY7Lrh/WXocDFujiHY2snZGn9O5yAYrLjJIrqMRSu+iFjNkqgc/wo1NP+DZnQvLihv214wIQC0GmsyxzK5a51x17ag8jo/DacPrFeHjnoPLUJVWMLFQ4qTRsFSuvs0m+bBYbA2gubAONYHnR62mftS1RupNjoovy/vWKLfsMomRYaWLKYM2Oz/S3C41aGa1EbW6gnZ8unZevPavFIFNkrfMOpZ823NwVcmo34roZ95L0qg1HA6apctyuVZLZmBziu1G39EctEfgxLTCqzVMpVrNZCwzuiGo2S7kQEnBj40F1i6eMGJ4bRGGsnivfI47FraX3PAxsNFb0GpxCWAvpC0HYxx2kX5vEKdhO2+IbMUqeFQrD2DfTXhDkFgzWG9xGcj+z1uuNzBm6Ap8APOo1oRH+oxuLfBhiBE3b7voF5HMSrCjtUvhzTaIZIfqACdErELTm7AeNhb1fiPnTYE8CuvJpKN3OJzcGahv5M6ELSOODJk54FG9tgYi44JbSgzU4schtgdbc23b68kI+4dpint7pTh2haRtZzSipISZxT+QF6ytyhoNtp6piVByII0CmocZMDZMmOywww477LDDDjvssMMOO+ywww7/77H/l2Iv9pdiL/SXYkfsTwMQy8HfEPNvKJRKhXLmb/pnzF8/OAxiuZdcKDd5gp/JvYPZa3HyQqg83eVCV7OXP4WZQSw1naUOegfFg9BBMdZ7yhWLB7li7J/fv38/d2LFWCyXi8Um+7HYS6/7ZxHLXfWKV+Nxpxcbd57HnUmnM+527vbvYrHpf2ed/f1Jd3//7lcX/xusxHDLNzpJTvs5B//SK/ovKdxhQrkDfDFlXGaJhYqd0HT6fPA8ncZivVQnFHt+fo11f+2Pp53Jr9jsn18vsf/9dz+VC7SP5V5m3denVOjqJXeVy931Xl8OJgehqymmMMF/QldPqdldbzoed3vPnVBv9ox/fOlAmwJiqdmsN+vMpuNuqtjLdYrFae8uFYul9sedu39jL//+KhYxsauA2+FBr3f3G9fgdxe3prveXQe//N7r7+cYFsDz+J9e73Ucm047ndj4ahzr3f07no6n0/EBSyyU+z1+6uUmk07uajabzkKd2Wuq89zTmt/+869x599x99fdfjFYYqlp57XX/d3FBHrjyazTG88w1V7vqvfam/U6r69TfGHyu/fUi3Vepj18/3k86xQtxFLTq9SkN85Nes/FaWzau5pMcq+d8UFxdpfqzLAEO5Np7Dlw1fGUenm60v7DjbGbuwp1i9pvk2I31U1Nnp5eniav3cnVFVbZT91U6CXXLZIqUgOdwh3vIKX/xX8OtN6UwloSX88Vce9MFXMp7TOBI6drixz9Y1xgfs6x2sTUHn+75/H3YUfsT8P/AQYbRKe3oMGqAAAAAElFTkSuQmCC" />
                  </div>
                  <div className="text-child">
                    <div>Mental</div>
                    <div>Health</div>
                  </div>
                </div>
                <div>
                  <div className="icon-child">
                    <img src="https://previews.123rf.com/images/decobrush/decobrush1808/decobrush180800065/107240832-tooth-icon-dentist-colorful-logo-dental-care-or-dental-clinic-line-icon-vector-illustration.jpg" />
                  </div>
                  <div className="text-child">
                    <div>Dental</div>
                    <div>Examination</div>
                  </div>
                </div>
                <div>
                  <div className="icon-child">
                    <img src="https://cdn-icons-png.flaticon.com/512/3209/3209005.png" />
                  </div>
                  <div className="text-child">
                    <div>Medical</div>
                    <div>Products</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Specialty />
        <MedicalAddress />
        <Doctor />
        <About />
        <Social />
        <div className="medical-container">
          <div className="address">
            <center>
              <img src="https://scontent.fhan1-1.fna.fbcdn.net/v/t1.15752-9/316303266_3425711090998184_8901455314023413458_n.png?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=jnlRZvn7U2gAX-cFcRO&_nc_ht=scontent.fhan1-1.fna&oh=03_AdRdFoMthZ9VVMrjifRmbEoCvJhSMqz0zXK8mReElQZLkQ&oe=63AFADF0"/>
            </center>
          </div>
        </div>
        <div className="about-back">
          <div className="address">
            <center>
              <img width="100%" src="https://scontent.fhan1-1.fna.fbcdn.net/v/t1.15752-9/315495019_696238251809746_5400613260992763702_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=_hGD95fOuc0AX9FrXEl&_nc_ht=scontent.fhan1-1.fna&oh=03_AdRBVS2X4gC4n1knOd7oMCv8L4mj0JUMj27W-9LOdCqyzw&oe=63AFC076"/>
            </center>
          </div>
        </div>
      </>
    );
  }
}
export default Homepage;
