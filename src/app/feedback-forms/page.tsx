"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Layout from "@/components/Layout";
import { CheckCircle, User, Users, Crown } from "lucide-react";
import { getColleagues, getManagers } from "@/lib/roleManager";

const FeedbackFormsPage = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"self" | "teammate" | "leader">("self");
  const [selectedColleague, setSelectedColleague] = useState("");
  const [selectedManager, setSelectedManager] = useState("");

  // Get team members from role manager
  const colleagues = getColleagues();
  const managers = getManagers();

  const renderSelfEvaluationForm = () => (
    <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Self-Evaluation Form</h2>
        <p className="text-[#646464] dark:text-[#909090] mt-1">Reflect on your achievements, goals, and alignment with company values.</p>
      </div>

      <div className="space-y-8">
        {/* Previous Achievements */}
        <div>
          <h3 className="text-lg font-medium text-[#212121] dark:text-white mb-4">Previous Achievements</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#212121] dark:text-white mb-3">
              Q1. Which achievements from your previous PDP have you accomplished?
            </label>
            <div className="space-y-2">
              {[
                "Achieved all planned goals",
                "Achieved part of the goals", 
                "Completed additional initiatives",
                "Other"
              ].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="achievements"
                    value={option}
                    className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                  />
                  <span className="ml-3 text-sm text-[#212121] dark:text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
              Q1.1: Please provide examples of results and specific achievements
            </label>
            <textarea
              rows={4}
              placeholder="Describe your specific achievements and results..."
              className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
            />
          </div>
        </div>

        {/* Plans & Development */}
        <div>
          <h3 className="text-lg font-medium text-[#212121] dark:text-white mb-4">Plans & Development</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
              Q3. What role would you like to have in 6-12 months?
            </label>
            <textarea
              rows={3}
              placeholder="Describe your desired role and career aspirations..."
              className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
              Q3.1: Which skills or actions will help you achieve this?
            </label>
            <textarea
              rows={3}
              placeholder="List the skills and actions needed for your career growth..."
              className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#212121] dark:text-white mb-3">
              Q5. Are there any initiatives you'd like to drive within the team?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Process Improvement",
                "Knowledge Sharing", 
                "Training Programs",
                "Innovation Projects",
                "Team Building",
                "Cross-team Collaboration"
              ].map((initiative) => (
                <label key={initiative} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737] rounded"
                  />
                  <span className="ml-3 text-sm text-[#212121] dark:text-white">{initiative}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Cieden Values */}
        <div>
          <h3 className="text-lg font-medium text-[#212121] dark:text-white mb-4">Alignment with Cieden's Values</h3>
          
          {/* Creativity */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-[#212121] dark:text-white mb-3">Q6. Creativity</h4>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I generate original ideas and propose creative solutions.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="creativity_ideas"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I adapt my design approach to different contexts and challenges.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="creativity_adaptation"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Intelligence */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-[#212121] dark:text-white mb-3">Q7. Intelligence</h4>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I base my decisions on research, facts, and case studies rather than intuition alone.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="intelligence_research"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I seek to deeply understand the problems I aim to solve.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="intelligence_understanding"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I continuously develop my professional expertise and share knowledge with others.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="intelligence_expertise"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Effectiveness & Efficiency */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-[#212121] dark:text-white mb-3">Q8. Effectiveness & Efficiency</h4>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I deliver high-quality work within reasonable timeframes.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="effectiveness_quality"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I focus on the value and outcomes my work creates, not only on the number of completed tasks.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="effectiveness_value"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I align my efforts with the business impact for the team and clients.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="effectiveness_impact"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Drive */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-[#212121] dark:text-white mb-3">Q9. Drive</h4>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I maintain work/life balance and take care of my mental and physical health.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="drive_balance"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I persistently pursue my goals despite obstacles.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="drive_persistence"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I actively seek challenging tasks and embrace difficult problems.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="drive_challenges"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Encouragement */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-[#212121] dark:text-white mb-3">Q10. Encouragement</h4>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I communicate openly and honestly without gossip or hidden agendas.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="encouragement_communication"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I give constructive feedback and actively seek it for my own improvement.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="encouragement_feedback"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I provide support and motivation to my colleagues.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="encouragement_support"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Nurturing */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-[#212121] dark:text-white mb-3">Q11. Nurturing</h4>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I am interested in the success of my colleagues and help across teams and departments.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="nurturing_success"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I actively participate in team events and initiatives.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="nurturing_participation"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-[#212121] dark:text-white mb-2">I share my knowledge through mentoring, workshops, or team sessions.</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="nurturing_sharing"
                        value={rating}
                        className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                      />
                      <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Work Comfort & Support */}
        <div>
          <h3 className="text-lg font-medium text-[#212121] dark:text-white mb-4">Work Comfort & Support</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
              Q12. How comfortable do you feel in your current work environment?
            </label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#646464] dark:text-[#909090]">Not comfortable</span>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="comfort"
                      value={rating}
                      className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737]"
                    />
                    <span className="ml-1 text-sm text-[#212121] dark:text-white">{rating}</span>
                  </label>
                ))}
              </div>
              <span className="text-sm text-[#646464] dark:text-[#909090]">Very comfortable</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
              Q13. What additional support would help you perform better?
            </label>
            <textarea
              rows={3}
              placeholder="Describe any resources, training, or support you need..."
              className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-[#e9e9e9] dark:border-[#373737]">
          <button className="px-4 py-2 border border-[#e9e9e9] dark:border-[#373737] text-[#212121] dark:text-white rounded-lg hover:bg-[#f8f9fa] dark:hover:bg-[#373737] transition-colors">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-[#651FFF] text-white rounded-lg hover:bg-[#5b1de6] transition-colors">
            Submit Evaluation
          </button>
        </div>
      </div>
    </div>
  );

  const renderTeammateEvaluationForm = () => (
    <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Teammate Evaluation Form</h2>
        <p className="text-[#646464] dark:text-[#909090] mt-1">Provide feedback for a colleague's performance</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
          Select a colleague to evaluate:
        </label>
        <select className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white">
          <option value="">Choose a colleague...</option>
                     {colleagues.map((colleague) => (
             <option key={colleague.id} value={colleague.id}>
               {colleague.name} - {colleague.role}
             </option>
           ))}
        </select>
      </div>

      <div className="text-center py-12">
        <CheckCircle className="h-12 w-12 text-[#646464] dark:text-[#909090] mx-auto mb-4" />
        <h3 className="text-lg font-medium text-[#212121] dark:text-white mb-2">Form will appear here</h3>
        <p className="text-[#646464] dark:text-[#909090]">
          Select a colleague above to start the evaluation form
        </p>
      </div>
    </div>
  );

  const renderLeaderEvaluationForm = () => (
    <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Leader Evaluation Form</h2>
        <p className="text-[#646464] dark:text-[#909090] mt-1">Provide feedback about your manager's leadership performance</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
          Select a manager to evaluate:
        </label>
        <select className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white">
          <option value="">Choose a manager...</option>
                     {managers.map((manager) => (
             <option key={manager.id} value={manager.id}>
               {manager.name} - {manager.role}
             </option>
           ))}
        </select>
      </div>

      <div className="text-center py-12">
        <CheckCircle className="h-12 w-12 text-[#646464] dark:text-[#909090] mx-auto mb-4" />
        <h3 className="text-lg font-medium text-[#212121] dark:text-white mb-2">Form will appear here</h3>
        <p className="text-[#646464] dark:text-[#909090]">
          Select a manager above to start the evaluation form
        </p>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#212121] dark:text-white">Feedback Forms</h1>
            <p className="text-[#646464] dark:text-[#909090] mt-1">
              Provide feedback to help improve performance and collaboration
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-[#f8f9fa] dark:bg-[#000319] rounded-lg p-1">
            <div className="flex space-x-1">
              {[
                { id: "self", name: "Self-Evaluation", icon: User },
                { id: "teammate", name: "Teammate Evaluation", icon: Users },
                { id: "leader", name: "Leader Evaluation", icon: Crown },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "self" | "teammate" | "leader")}
                  className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#651FFF] text-white"
                      : "text-[#646464] dark:text-[#909090] hover:text-[#212121] dark:hover:text-white"
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="mt-8">
            {activeTab === "self" && renderSelfEvaluationForm()}
            {activeTab === "teammate" && renderTeammateEvaluationForm()}
            {activeTab === "leader" && renderLeaderEvaluationForm()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackFormsPage;
